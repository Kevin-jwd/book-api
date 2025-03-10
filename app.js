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

const router = (userRouter = require("./routes/user.js"));
app.use("/", userRouter);
