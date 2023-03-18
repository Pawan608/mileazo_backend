const crypto = require("crypto");
const express = require("express");
const apiRoute = require("./route/apiRoute");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const globalErrorHandler = require("./errorController");
const AppError = require("./utils/appError");
app.use(cors());
app.use(express.json());

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is Working on  http://localhost:${5000}`);
});
app.use("/api", apiRoute);
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);
module.exports = app;
