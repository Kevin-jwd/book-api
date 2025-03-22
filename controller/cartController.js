// mariadb module
const conn = require("../mariadb");

// http-status-codes module
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

// 장바구니 담기
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

// 장바구니 목록 조회
const getCartItems = (req, res) => {
    const { user_id } = req.body;

    const value = [user_id];

    const sql = `SELECT cart_items.id, book_id, title, summary, quantity, price 
                    FROM cart_items LEFT JOIN books 
                    ON cart_items.book_id = books.id
                    WHERE user_id = ?`;
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

// 장바구니 상품 삭제 
const deleteCartItems = (req, res) => {
    const { cart_item_id } = req.params;

    const value = [cart_item_id];

    const sql = `DELETE FROM cart_items WHERE id = ?`;
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

module.exports = {
    addCartItems,
    deleteCartItems,
    getCartItems,
};
