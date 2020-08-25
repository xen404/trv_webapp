const cors = require("cors");
const pool = require("../database");
const bcrypt = require("bcryptjs");
const keys = require("../config/keys");
const jwt = require("jsonwebtoken");
const { cloudinary } = require("../utils/cloudinary");


module.exports = (app) => {
  app.post("/api/new_user", async (req, res) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
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
          "INSERT INTO users (name, email, password, role)   VALUES($1, $2, $3, $4) RETURNING *",
          [name, email, passwordHashed, role]
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
                role: newUser.role
              },
            });
          }
        );
      });
    });
  });

  app.post("/api/new_user_reg", async (req, res) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
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
        try {
            passwordHashed = hash;
        const response = await pool.query(
          "INSERT INTO users (name, email, password, role)   VALUES($1, $2, $3, $4) RETURNING *",
          [name, email, passwordHashed, role]
        );
        newUser = response.rows[0];
        console.log('New user was created!');
        console.log(newUser);
        res.json({
            successMsg: "User created!",
            user: {
              id: newUser.id,
              name: newUser.name,
              email: newUser.email,
              role: newUser.role
            },
          });
        } catch (err) {
            console.log('Error accured!')
            console.error(err.message);
            res.status(500).json({ err: "Smth went wrong" });
        }
        
      });
    });
  });

  app.get("/api/users", async (req, res) => {
    const allNews = await pool.query("SELECT * FROM users;");
    console.log(allNews.rows);
    console.log(allNews.rows);
    res.send(allNews.rows);
  });

};



