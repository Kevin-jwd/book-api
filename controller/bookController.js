// mariadb module
const conn = require("../mariadb");

// http-status-codes module
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

// 전체 도서 조회 모듈
const getAllBooks = (req, res) => {
    const sql = `SELECT * FROM books`;
    conn.query(sql, (err, results) => {
        if (err) {
            return res.status(StatusCodes.BAD_REQUEST).end();
        }
        return res.status(StatusCodes.OK).json({
            message: ReasonPhrases.OK,
            results: results,
        });
    });
};

// 개별 도서 상세 정보 조회 모듈
const getDetailedBook = (req, res) => {};

// 장르별 도서 조회 모듈
const getBooksByGenres = (req, res) => {};

module.exports = {
    getAllBooks,
    getDetailedBook,
    getBooksByGenres,
};
