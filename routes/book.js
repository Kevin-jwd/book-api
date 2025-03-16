// express module
const express = require("express");
const router = express.Router();

const { getBooks, getDetailedBook } = require("../controller/bookController");

// 전체 도서 및 장르별 도서 조회
router.get("/", getBooks);

// 개별 도서 조회
router.get("/:id", getDetailedBook);

module.exports = router;
