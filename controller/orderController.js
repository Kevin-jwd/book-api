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
    const {
        items,
        delivery,
        total_quantity,
        total_price,
        user_id,
        first_book_title,
    } = req.body;

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

    sql = `SELECT book_id, quantity FROM cart_items WHERE id IN (?)`;
    let [order_items, fields] = await conn.query(sql, [items]);

    // ordered_books 테이블 삽입
    sql = `INSERT INTO ordered_books (order_id, book_id, quantity) VALUES ?`;

    values = [];
    order_items.forEach((item) => {
        values.push([order_id, item.book_id, item.quantity]);
    });
    results = await conn.query(sql, [values]);
    result = await deleteCartItems(conn, items);

    return res.status(StatusCodes.OK).json(results);
};

const deleteCartItems = async (conn, items) => {
    const sql = `DELETE FROM cart_items WHERE id IN (?)`;
    const results = await conn.query(sql, [items]);
    return results;
};

// 주문 내역 조회
const getOrders = async (req, res) => {
    const conn = await mariadb.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "BookShop",
        dateStrings: true,
    });
    let sql = `SELECT orders.id, created_at, address, receiver, contact,
                book_title, total_quantity, total_price
                FROM orders 
                LEFT JOIN deliveries 
                ON orders.delivery_id = deliveries.id;`;
    let [rows, fields] = await conn.query(sql);
    return res.status(StatusCodes.OK).json(rows);
};

// 주문 상세 조회
const getOrderDetail = async (req, res) => {
    const { order_id } = req.params;

    const conn = await mariadb.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "BookShop",
        dateStrings: true,
    });

    let sql = `SELECT book_id, title, author, price, quantity
                FROM ordered_books
                LEFT JOIN books
                ON ordered_books.book_id = books.id
                WHERE order_id = ?;`;
    let [rows, fields] = await conn.query(sql, [order_id]);
    return res.status(StatusCodes.OK).json(rows);
};

module.exports = {
    order,
    getOrders,
    getOrderDetail,
};
