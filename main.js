var express = require("express");
var fs = require("fs");
var session = require("express-session");
const path = require("path");
const flash = require("connect-flash");
const passport = require("passport");
const cookieParser = require("cookie-parser");
require("dotenv").config();

var pageRouter = require("./routes/page");
var authRouter = require("./routes/auth");

var postRouter = require("./routes/post");

const { sequelize } = require("./models");
const passportConfig = require("./passport");
const app = express();
sequelize.sync();
passportConfig(passport);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use("/", pageRouter);
app.use("/auth", authRouter);
app.use("/post", postRouter);

app.use(function (req, res, next) {
  res.status(404).send("Sorry cant find that!");
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(8000, function () {
  console.log("Example app listening on port 3000!");
});
