const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const axios = require("axios");
var FormData = require("form-data");

// const message = {
//   username: "7061329220",
//   password: "123456789",
//   type: "4",
//   purpose: "LOGIN",
// };
router.post(
  "/",
  (req, res, next) => {
    const algorithm = "aes-128-ecb";

    const message = req.body;
    console.log(message);
    // generate 16 bytes of random data
    //   const initVector = "0111201810303000";

    // protected data

    // secret key generate 32 bytes of random data
    const Securitykey = "0111201810303000";

    // the cipher function
    const cipher = crypto.createCipheriv(algorithm, Securitykey, null);

    // encrypt the message
    // input encoding
    // output encoding
    let encryptedData = cipher.update(
      JSON.stringify(message),
      "utf-8",
      "base64"
    );

    encryptedData += cipher.final("base64");
    console.log("Encrypted message: " + encryptedData);
    req.body.param = encryptedData;
    next();
  },
  async (req, res, next) => {
    var form = new FormData();
    form.append("param", req.body.param);
    let response = await axios({
      method: "POST",
      url: "http://mileazo.com/mvsm/local/v115/api.php",
      data: form,
    });
    console.log(response);
    return res.status(200).json({
      status: "success",
      data: response.data,
    });
  }
);

module.exports = router;
