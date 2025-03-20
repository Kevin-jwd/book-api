// mariadb module
const conn = require("../mariadb");

// http-status-codes module
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

// 전체 도서 및 장르별 도서 조회 모듈
const getBooks = (req, res) => {
    const { genre_id, new_book, limit, currentPage } = req.query;

    let offset = limit * (currentPage - 1);

    const conditions = [];
    let values = [];
    let sql = `
    SELECT books.*, 
           genres.name AS genre, 
           (SELECT COUNT(*) FROM likes WHERE book_id = books.id) AS likes_count
        FROM books 
        LEFT JOIN genres ON books.genre_id = genres.id
    `;

    if (genre_id) {
        conditions.push(`books.genre_id = ?`);
        values.push(genre_id);
    }
    if (new_book) {
        conditions.push(`books.pub_date >= DATE_SUB(NOW(), INTERVAL 1 MONTH)`);
    }

    if (conditions.length) {
        sql += ` WHERE ` + conditions.join(" AND ");
    }

    sql += ` LIMIT ? OFFSET ?`;
    values.push(parseInt(limit), offset);

    conn.query(sql, values, (err, results) => {
        if (err) {
            return res.status(StatusCodes.BAD_REQUEST).end();
        }
        if (!results.length) {
            return res.status(StatusCodes.NOT_FOUND).end();
        }
        return res.status(StatusCodes.OK).json({
            message: ReasonPhrases.OK,
            results,
        });
    });
};

// 개별 도서 상세 정보 조회 모듈
const getDetailedBook = (req, res) => {
    const { user_id } = req.body;
    const { book_id } = req.params;
    const values = [user_id, book_id, book_id];

    const sql = `SELECT *,
                        (SELECT count(*) FROm likes WHERE book_id = books.id) AS likes,
                        (SELECT EXISTS (SELECT * FROM likes WHERE user_id = ? AND book_id = ?)) AS liked
                    FROM books
                    LEFT JOIN genres
                    ON books.genre_id = genres.id
                    WHERE books.id = ?`;
    conn.query(sql, values, (err, results) => {
        if (err) {
            return res.status(StatusCodes.BAD_REQUEST).end();
        }
        if (!results[0]) {
            return res.status(StatusCodes.NOT_FOUND).end();
        }
        return res.status(StatusCodes.OK).json({
            message: ReasonPhrases.OK,
            results: results,
        });
    });
};

module.exports = {
    getBooks,
    getDetailedBook,
};
