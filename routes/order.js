// express module
const express = require("express");
const router = express.Router();
const { order, getOrders } = require("../controller/orderController.js");
router.use(express.json());

router
    .route("/")
    // 주문하기기
    .post(order)
    // 주문 내역 조회
    .get(getOrders);

module.exports = router;