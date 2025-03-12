// mariadb module
const conn = require("../mariadb");

// jwt module
const jwt = require("jsonwebtoken");

// dotenv module
const dotenv = require("dotenv");
dotenv.config();

// crypto module
const crypto = require("crypto");

// http-status-codes module
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

// 회원가입 모듈
const register = (req, res) => {
    const { email, name, password, contact } = req.body;

    // password-hashing
    const salt = crypto.randomBytes(64).toString("base64");
    const hashedPassword = crypto
        .pbkdf2Sync(password, salt, 10000, 64, "sha512")
        .toString("base64");

    const sql = `INSERT INTO users (email, name, password, contact, salt) VALUES (?, ?, ?, ?, ?)`;
    const values = [email, name, hashedPassword, contact, salt];

    conn.query(sql, values, (err, results) => {
        if (err) {
            return res.status(StatusCodes.BAD_REQUEST).end();
        }
        return res.status(StatusCodes.CREATED).json({
            message: ReasonPhrases.CREATED,
            value: results,
        });
    });
};

// 로그인 모듈
const login = (req, res) => {
    const { email, password } = req.body;
    const sql = `SELECT * FROM users WHERE users.email = ?`;

    conn.query(sql, email, (err, results) => {
        if (err) {
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        const loginUser = results[0];

        const hashedPassword = crypto
            .pbkdf2Sync(password, loginUser.salt, 10000, 64, "sha512")
            .toString("base64");

        if (!loginUser || loginUser.password !== hashedPassword) {
            return res.status(StatusCodes.UNAUTHORIZED).end();
        }

        const token = jwt.sign(
            {
                email: loginUser.email,
            },
            process.env.PRIVATE_KEY,
            {
                expiresIn: "30m",
                issuer: "Do",
            }
        );
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            maxAge: 1000 * 60 * 60 * 24,
        });

        return res.status(StatusCodes.OK).json({
            message: ReasonPhrases.OK,
            results: results,
        });
    });
};

// 비밀번호 초기화 요청 모듈
const passwordResetRequest = (req, res) => {
    const { email, contact } = req.body;

    if (!email || !contact) {
        return res.status(StatusCodes.BAD_REQUEST).end();
    }

    const sql = `SELECT * FROM users WHERE email = ?`;
    const values = [email];

    conn.query(sql, values, (err, results) => {
        if (err) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
        }
        const user = results[0];
        if (user && user.contact === contact) {
            return res.status(StatusCodes.OK).end();
        }
        return res.status(StatusCodes.UNAUTHORIZED).end();
    });
};

// 비밀번호 초기화 모듈
const passwordResetConfirm = (req, res) => {};

module.exports = {
    register,
    login,
    passwordResetRequest,
    passwordResetConfirm,
};
