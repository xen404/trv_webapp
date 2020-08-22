const keys = require("../config/keys");
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied!" });
  }

  try {
      console.log(token);
    const decoded = jwt.verify(token, keys.jwtSecret);
    console.log(decoded);

    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ msg: "Token is not valid!" });
  }
}

module.exports = auth;
