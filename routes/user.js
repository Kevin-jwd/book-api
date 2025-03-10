// express module
const express = require("express");
const router = express.Router();

router.use(express.json());

// 회원가입
router.post("/register", (req, res) => {
    res.json({});
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