// express module
const express = require("express");
const router = express.Router();
const conn = require("../mariadb");

router.use(express.json());

// 회원가입
router.post("/register", (req, res) => {
    const { name, contact, email, password } = req.body;
    const sql = `INSERT INTO users (name, contact, email, password) VALUES (?, ?, ?, ?)`;
    const values = [name, contact, email, password];

    conn.query(sql, values, (err, result) => {
        if (err) {
            return res.status(400).json({
                message: "Bad Request",
            });
        }
        return res.status(201).json({
            message: "Created",
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
    .post("/auth/password-reset", (req, res) => res.json({}))
    // 초기화
    .put("/auth/password-reset", (req, res) => res.json({}));

module.exports = router;
