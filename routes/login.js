const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const saltRounds = 10;
const passwordText = "admin";
let username = "admin";

router.post("/", async (req, res) => {
  const hash = bcrypt.hashSync(passwordText, saltRounds);
  if (req.body.username == null) {
    res.json("No user");
  } else if (
    req.body.username == username &&
    (await bcrypt.compare(req.body.password, hash))
  ) {
    res.json("Ok username and password");
  } else {
    res.json("wrong information");
  }
});

module.exports = router;
