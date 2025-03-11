// express module
const express = require("express");
const router = express.Router();

// userController
const {
    register,
    login,
    passwordResetRequest,
    passwordResetConfirm,
} = require("../controller/UserController");

// 회원가입
router.post("/register", register);

// 로그인
router.post("/auth/login", login);

// 비밀번호
router
    .route("/auth/password-reset")
    // 초기화 요청
    .post(passwordResetRequest)
    // 초기화
    .put(passwordResetConfirm);

module.exports = router;
