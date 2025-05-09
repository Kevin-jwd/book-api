// express module
const express = require("express");
const router = express.Router();

// userController
const {
    register,
    login,
    passwordResetRequest,
    passwordResetConfirm,
} = require("../controller/userController");

// 회원가입
router.post("/register", register);

// 로그인
router.post("/login", login);

// 비밀번호
router
    .route("/password-reset")
    // 초기화 요청
    .post(passwordResetRequest)
    // 초기화
    .put(passwordResetConfirm);

module.exports = router;
