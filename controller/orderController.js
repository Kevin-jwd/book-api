// mariadb module
const conn = require("../mariadb");

// http-status-codes module
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

// 주문하기
const order = (req, res) => {
    res.json("주문하기");
};

// 주문 내역 조회
const getOrders = (req, res) => {
    res.json("주문 내역 조회");
};

// 주문 상세 조회
const getOrderDetail = (req, res) => {
    res.json("주문 상세 조회");
};

module.exports = {
    order,
    getOrders,
    getOrderDetail,
};
