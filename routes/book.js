// express module
const express = require("express");
const router = express.Router();

router.use(express.json());

// 전체 도서 조회
router.get("/", (req, res) => {
    res.json({});
});

// 개별 도서 조회
router.get("/:id", (req, res) => {
    res.json({});
});

// 장르별 도서 조회
router.get("/", (req, res) => {
    res.json({});
});

module.exports = router;
