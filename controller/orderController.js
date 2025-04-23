// mariadb module
// const conn = require("../mariadb");
const mariadb = require("mysql2/promise");

// http-status-codes module
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

// 주문하기
const order = async (req, res) => {
    const conn = await mariadb.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "BookShop",
        dateStrings: true,
    });
    const { items, delivery, total_quantity, total_price, user_id, first_book_title } =
        req.body;

    // deliveries 테이블 삽입
    let sql = `INSERT INTO deliveries (address, receiver, contact) VALUES (?, ?, ?)`;
    let values = [delivery.address, delivery.receiver, delivery.contact];

    let [results] = await conn.execute(sql, values);
    let delivery_id = results.insertId;

    // orders 테이블 삽입
    sql = `INSERT INTO orders (user_id, delivery_id, book_title, total_quantity, total_price) VALUES (?, ?, ?, ?, ?)`;
    values = [
        user_id,
        delivery_id,
        first_book_title,
        total_quantity,
        total_price,
    ];
    [results] = await conn.execute(sql, values);
    let order_id = results.insertId;

    // ordered_books 테이블 삽입
    sql = `INSERT INTO ordered_books (order_id, book_id, quantity) VALUES ?`;

    values = [];
    items.forEach((item) => {
        values.push([order_id, item.book_id, item.quantity]);
    });
    [results] = await conn.query(sql, [values]);

    return res.status(StatusCodes.OK).json(results);
};

// 주문 내역 조회
const getOrders = (req, res) => {
    res.json("주문 내역 조회");
};

// 주문 상세 조회
const getOrderDetail = (req, res) => {
    res.json("주문 상세 조회");
};

module.exports = {
    order,
    getOrders,
    getOrderDetail,
};
