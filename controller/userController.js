// mariadb module
const conn = require("../mariadb");

const register = (req, res) => {
    const { email, name, password, contact } = req.body;
    const sql = `INSERT INTO users (email, name, password, contact) VALUES (?, ?, ?, ?)`;
    const values = [email, name, password, contact];

    conn.query(sql, values, (err, result) => {
        if (err) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: ReasonPhrases.BAD_REQUEST,
            });
        }
        return res.status(StatusCodes.CREATED).json({
            message: ReasonPhrases.CREATED,
            value: values,
        });
    });
};

module.exports = register;
