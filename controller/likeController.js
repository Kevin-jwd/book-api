const conn = require("../mariadb");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const router = require("../routes/user");

// 좋아요 추가
const addLike = (req, res) => {
    const { user_id } = req.body;
    const { book_id } = req.params;

    const value = [user_id, book_id];

    const sql = `INSERT INTO likes (user_id, book_id) VALUES (?, ?)`;
    conn.query(sql, value, (err, results) => {
        if (err) {
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        return res.status(StatusCodes.CREATED).json({
            message: ReasonPhrases.CREATED,
            results: results,
        });
    });
};

const removeLike = (req, res) => {
    res.json("좋아요 삭제");
};

module.exports = {
    addLike,
    removeLike,
};
