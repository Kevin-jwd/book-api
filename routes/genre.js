// express module
const express = require("express");
const router = express.Router();

const { getAllGenres } = require("../controller/genreFController");

// 전체 도서 및 장르별 도서 조회
router.get("/", getAllGenres);

module.exports = router;
