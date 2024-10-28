const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const ErrorHandler = require("./utils/ErrorHandler");
const { generatedErrors } = require("./middleware/errors");


const userRouter = require("./routes/user.routes");
const authRouter = require("./routes/auth.routes");

require("./configs/envConfig").envConfig()

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(expressSession({
  resave: true,
  saveUninitialized: true,
  secret: process.env.EXPRESS_SESSION_SECRET,
}));



app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/restaurant", userRouter);
app.use("/api/reviews", userRouter);
app.use("/api/order", userRouter);
app.use("/api/favprotes", userRouter);
app.use("/api/payment", userRouter);
app.use("/api/category", userRouter);

app.all("*", (req, res, next) => {
  new ErrorHandler(`page not found ${req.url}`, 404);
});
app.use(generatedErrors);

module.exports = app;
