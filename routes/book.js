// express module
const express = require("express");
const router = express.Router();

const {
    getAllBooks,
    getDetailedBook,
    getBooksByGenres,
} = require("../controller/bookController");

// 전체 도서 조회
router.get("/", getAllBooks);

// 개별 도서 조회
router.get("/:id", getDetailedBook);

// 장르별 도서 조회
router.get("/", getBooksByGenres);

module.exports = router;
