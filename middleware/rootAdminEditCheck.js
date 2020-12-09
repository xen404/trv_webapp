const keys = require("../config/keys");
const jwt = require("jsonwebtoken");
const pool = require("../database");

async function rootAdminEditCheck(req, res, next) {
  const token = req.header("x-auth-token");
  try {
    const { id } = req.params;
    const decoded = jwt.verify(token, keys.jwtSecret);
    if (id == 9) {
      return res.status(401).json({ msg: "You can't edit root admin!" });
    }
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ msg: error.msg });
  }
}

module.exports = rootAdminEditCheck;
