const pool = require("../database");
const bcrypt = require("bcryptjs");
const keys = require("../config/keys");
const jwt = require("jsonwebtoken");
const isLoggedIn = require("../middleware/isLoggedIn");

module.exports = (app) => {
  app.post("/api/auth", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Please enter all fields!" });
    }

    const response = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (response.rowCount === 0) {
      return res.status(400).json({ msg: "User does not exist!" });
    }

    const user = response.rows[0];

    await bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) {
        return res.status(400).json({ msg: "invalid credentials!" });
      }
      jwt.sign(
        { id: user.id, role: user.role },
        keys.jwtSecret,
        { expiresIn: 7200 },
        (err, token) => {
          if (err) {
            throw err;
          }
          res.json({
            token: token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            },
          });
        }
      );
    });
  });

  app.get("/api/auth/user", isLoggedIn, async (req, res) => {
    const response = await pool.query("SELECT * FROM users WHERE id = $1", [
      req.user.id,
    ]);
    const user = response.rows[0];

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  });
};
