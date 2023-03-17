const crypto = require("crypto");
const express = require("express");
const apiRoute = require("./route/apiRoute");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

app.listen(5000, () => {
  console.log(`Server is Working on  http://localhost:${5000}`);
});
app.use("/api", apiRoute);
