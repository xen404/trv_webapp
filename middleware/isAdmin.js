const keys = require("../config/keys");
const jwt = require("jsonwebtoken");
const pool = require("../database");

async function isAdmin(req, res, next) {
  const token = req.header("x-auth-token");

  try {
    const decoded = jwt.verify(token, keys.jwtSecret);
    console.log('IsAdmin');
    if (decoded.role != "ADMIN") {
      return res.status(401).json({ msg: "Permission denied!" });
    }

    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ msg: error.msg });
  }
}

module.exports = isAdmin;
