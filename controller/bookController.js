// mariadb module
const conn = require("../mariadb");

// http-status-codes module
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

// 전체 도서 및 장르별 도서 조회 모듈
const getBooks = (req, res) => {
    const { genre_id, new_book } = req.query;
    let sql = `SELECT books.*, genres.name AS genre FROM books LEFT JOIN genres ON books.genre_id = genres.id`;
    const values = [];
    const conditions = [];

    if (genre_id) {
        conditions.push(`books.genre_id = ?`);
        values.push(genre_id);
    }
    if (new_book) {
        conditions.push(`books.pub_date >= DATE_SUB(NOW(), INTERVAL 1 MONTH)`);
    }

    if (conditions.length) {
        sql += ` WHERE ` + conditions.join(" AND ");
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
