// express module
const express = require("express");
const router = express.Router();

const { addCartItems, getCartItems, deleteCartItems } = require("../controller/cartController");

router
    .route("/")
    // 장바구니 담기
    .post(addCartItems)
    // 장바구니 조회
    .get(getCartItems);

// 장바구니 도서 삭제
router.delete("/:book_id", deleteCartItems);

module.exports = router;
