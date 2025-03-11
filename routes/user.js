// express module
const express = require("express");
const router = express.Router();

// mariadb module
const conn = require("../mariadb");

// http-status-codes module
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

// userController
const register = require("../controller/UserController");

// 회원가입
router.post("/register", register);

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
