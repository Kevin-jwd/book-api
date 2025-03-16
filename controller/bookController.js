// mariadb module
const conn = require("../mariadb");

// http-status-codes module
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

// 전체 도서 및 장르별 도서서 조회 모듈
const getBooks = (req, res) => {
    const { genre_id } = req.query;
    let sql = `SELECT * FROM books`;
    const values = [];

    if (genre_id) {
        sql += ` WHERE genre_id = ?`;
        values.push(genre_id);
    }

    conn.query(sql, values, (err, results) => {
        if (err) {
            return res.status(StatusCodes.BAD_REQUEST).end();
        }
        if (!results.length) {
            return res.status(StatusCodes.NOT_FOUND).end();
        }
        return res.status(StatusCodes.OK).json({
            message: ReasonPhrases.OK,
            results,
        });
    });
};

// 개별 도서 상세 정보 조회 모듈
const getDetailedBook = (req, res) => {
    const { id } = req.params;
    const value = [id];

    const sql = `SELECT * FROM books WHERE id = ?`;
    conn.query(sql, value, (err, results) => {
        if (err) {
            return res.status(StatusCodes.BAD_REQUEST).end();
        }
        if (!results[0]) {
            return res.status(StatusCodes.NOT_FOUND).end();
        }
        return res.status(StatusCodes.OK).json({
            message: ReasonPhrases.OK,
            results: results,
        });
    });
};

module.exports = {
    getBooks,
    getDetailedBook,
};
