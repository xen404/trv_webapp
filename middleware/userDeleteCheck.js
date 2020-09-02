const keys = require("../config/keys");
const jwt = require("jsonwebtoken");
const pool = require("../database");

async function userDeleteCheck(req, res, next) {
  const token = req.header("x-auth-token");
  try {
    const { id } = req.params;
    if(id == 89) {
      return res.status(401).json({ msg: "Can not delete root admin!" });
    }
    const decoded = jwt.verify(token, keys.jwtSecret);
    if (decoded.id == id) {
      return res.status(401).json({ msg: "You can't delete yourself!" });
    }
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ msg: error.msg });
  }
}

module.exports = userDeleteCheck;
