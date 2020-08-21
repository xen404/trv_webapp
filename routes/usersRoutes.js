const cors = require("cors");
const pool = require("../database");
const bcrypt = require("bcryptjs");
const keys = require("../config/keys");
const jwt = require("jsonwebtoken");
const { cloudinary } = require("../utils/cloudinary");


module.exports = (app) => {
  app.post("/api/new_user", async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Please enter all fields!" });
    }

    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (user.rowCount !== 0) {
      return res.status(400).json({ msg: "User already exists!" });
    }

    bcrypt.genSalt(10, async (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) {
          throw err;
        }
        passwordHashed = hash;
        const response = await pool.query(
          "INSERT INTO users (name, email, password)   VALUES($1, $2, $3) RETURNING *",
          [name, email, passwordHashed]
        );
        newUser = response.rows[0];
        console.log(newUser);

        jwt.sign(
          { id: newUser.id },
          keys.jwtSecret,
          { expiresIn: 7200 },
          (err, token) => {
            if (err) {
                throw err;
            }
            res.json({
              token: token,
              user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
              },
            });
          }
        );
      });
    });
  });
};
