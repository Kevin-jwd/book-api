// express module
const express = require("express");
const app = express();

// dotenv module
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

const userRouter = require("./routes/user");
const bookRouter = require("./routes/book");
const likeRouter = require("./routes/like");
const cartRouter = require("./routes/cart");
const orderRouter = require("./routes/order");

app.use("/users", userRouter);
app.use("/books", bookRouter);
app.use("/likes", likeRouter);
app.use("/carts", cartRouter);
app.use("/orders", orderRouter);
