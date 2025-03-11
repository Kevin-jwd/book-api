// express module
const express = require("express");
const router = express.Router();
const conn = require("../mariadb");

// http-status-codes module
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

// 회원가입
router.post("/register", (req, res) => {
    const { email, name, password, contact } = req.body;
    const sql = `INSERT INTO users (email, name, password, contact) VALUES (?, ?, ?, ?)`;
    const values = [email, name, password, contact];

    conn.query(sql, values, (err, result) => {
        if (err) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: ReasonPhrases.BAD_REQUEST,
            });
        }
        return res.status(StatusCodes.CREATED).json({
            message: ReasonPhrases.CREATED,
            value: values,
        });
    });
});

// 로그인
router.post("/auth/login", (req, res) => {
    res.json({});
});

// 비밀번호
router
    .route("/auth/password-reset")
    // 초기화 요청
    .post((req, res) => res.json({}))
    // 초기화
    .put((req, res) => res.json({}));

module.exports = router;
