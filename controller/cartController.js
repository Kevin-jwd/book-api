// mariadb module
const conn = require("../mariadb");

// http-status-codes module
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const addCartItems = (req, res) => {
    res.json("장바구니 담기");
};
const getCartItems = (req, res) => {
    res.json("장바구니 조회");
};
const deleteCartItems = (req, res) => {
    res.json("장바구니 도서 삭제");
};

module.exports = {
    addCartItems,
    deleteCartItems,
    getCartItems,
};
