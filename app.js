const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mysql = require("mysql2");
const cors = require("cors");

const indexRouter = require("./routes/index");
const loginRouter = require("./routes/login");
const savedocRouter = require("./routes/savedoc");
const fetchdocsRouter = require("./routes/fetchdocs");
const deleteRouter = require("./routes/delete");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.locals.con = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "admin",
  password: "admin",
  database: "notesapp",
});

app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/savedoc", savedocRouter);
app.use("/fetchdocs", fetchdocsRouter);
app.use("/delete", deleteRouter);

module.exports = app;
