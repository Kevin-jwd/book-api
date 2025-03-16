// mariadb module
const conn = require("../mariadb");

// http-status-codes module
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

// 전제 장르 조회
const getAllGenres = (req, res) => {
    let sql = `SELECT * FROM genres`;

    conn.query(sql, (err, results) => {
        if (err) {
            return res.status(StatusCodes.BAD_REQUEST).end();
        }
        return res.status(StatusCodes.OK).json({
            message: ReasonPhrases.OK,
            results,
        });
    });
};

module.exports = {
    getAllGenres,
};
