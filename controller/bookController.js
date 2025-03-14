// mariadb module
const conn = require("../mariadb");

// dotenv module
const dotenv = require("dotenv");
dotenv.config();

// http-status-codes module
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

// 전체 도서 조회 모듈듈
const getAllBooks = (req, res) => {};

// 개별 도서 상세 정보 조회 모듈
const getDetailedBook = (req, res) => {};

// 장르별 도서 조회 모듈
const getBooksByGenres = (req, res) => {};

module.exports = {
    getAllBooks,
    getDetailedBook,
    getBooksByGenres,
};
