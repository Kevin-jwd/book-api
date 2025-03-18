const conn = require("../mariadb");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const router = require("../routes/user");

const addLike = (req, res) => {
    res.json("좋아요 추가");
};

const removeLike = (req, res) => {
    res.json("좋아요 삭제");
};

module.exports = {
    addLike,
    removeLike,
};
