const pool = require("../mariadb");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const getAllGenres = async (req, res) => {
    const sql = `SELECT * FROM genres`;

    try {
        const [results] = await pool.query(sql); // pool.query
        return res.status(StatusCodes.OK).json({
            message: ReasonPhrases.OK,
            results,
        });
    } catch (err) {
        console.error(err);
        return res.status(StatusCodes.BAD_REQUEST).end();
    }
};

module.exports = {
    getAllGenres,
};
