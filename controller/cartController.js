// mariadb module
const conn = require("../mariadb");

// http-status-codes module
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const addCartItems = (req, res) => {
    const { user_id, book_id, quantity } = req.body;

    const value = [user_id, book_id, quantity];

    const sql = `INSERT INTO cart_items (user_id, quantity, book_id) VALUES (?, ?, ?)`;
    conn.query(sql, value, (err, results) => {
        if (err) {
            return res.status(StatusCodes.BAD_REQUEST).end();
        }
        return res.status(StatusCodes.OK).json({
            message: ReasonPhrases.OK,
            results: results,
        });
    });
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
