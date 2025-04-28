// express module
const express = require("express");
const app = express();

// dotenv module
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;

// cors module
const cors = require("cors");

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

const userRouter = require("./routes/user");
const bookRouter = require("./routes/book");
const genreRouter = require("./routes/genre");
const likeRouter = require("./routes/like");
const cartRouter = require("./routes/cart_item");
const orderRouter = require("./routes/order");

app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000", // 허용할 origin
    credentials: true, // 쿠키 같은 것도 허용할지 여부
}));
app.use("/users", userRouter);
app.use("/books", bookRouter);
app.use("/genres", genreRouter);
app.use("/likes", likeRouter);
app.use("/cart_items", cartRouter);
app.use("/orders", orderRouter);
