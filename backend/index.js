const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

const connectDB = require("./config/db");
connectDB();

const express = require("express");
const app = express();
app.use(express.json());

app.use("/api/posts", require('./routes/posts'));
app.use("/api/users", require('./routes/users'));
app.use("/api/auth", require('./routes/auth'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
