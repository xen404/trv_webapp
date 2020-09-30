const cors = require("cors");
const isAdmin = require("../middleware/isAdmin");
const isLoggedIn = require("../middleware/isLoggedIn");
const userDeleteCheck = require("../middleware/userDeleteCheck");
const pool = require("../database");
const bcrypt = require("bcryptjs");
const keys = require("../config/keys");
const jwt = require("jsonwebtoken");
const { cloudinary } = require("../utils/cloudinary");

module.exports = (app) => {
  app.post("/api/new_user", isLoggedIn, isAdmin, async (req, res) => {
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
                role: newUser.role,
              },
            });
          }
        );
      });
    });
  });

  app.post("/api/new_user_reg", isLoggedIn, isAdmin, async (req, res) => {
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
          res.json({
            successMsg: "User created!",
            user: {
              id: newUser.id,
              name: newUser.name,
              email: newUser.email,
              role: newUser.role,
            },
          });
        } catch (err) {
          res.status(500).json({ err: err.message });
        }
      });
    });
  });

  app.get("/api/users", isLoggedIn, isAdmin, async (req, res) => {
    const allNews = await pool.query("SELECT * FROM users;");
    res.send(allNews.rows.reverse());
  });

  app.delete(
    "/api/user/delete/:id",
    isLoggedIn,
    isAdmin,
    userDeleteCheck,
    async (req, res) => {
      try {
        const { id } = req.params;
        const deleteUser = await pool.query("DELETE FROM users WHERE id = $1", [
          id,
        ]);
         const allUsers = await pool.query("SELECT * FROM users;");
        res.json({
          //userId: id,
          users: allUsers.rows.reverse(),
          successMsg: "User was deleted!",
        });
      } catch (err) {
        return res.status(404).json({ msg: err.message });
      }
    }
  );

  app.put("/api/users/update_user", isLoggedIn, isAdmin, async (req, res) => {
    
    const {id, name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ msg: "Please enter all fields!" });
    }

    const user = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    if (user.rowCount == 0) {
      return res.status(400).json({ msg: "Such user doesn't exist!" });
    }
    bcrypt.genSalt(10, async (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) {
          throw err;
        }
        try {
          passwordHashed = hash;
          console.log(name, email, passwordHashed, role, id);
          const response = await pool.query(
            "UPDATE users SET name = $1, email = $2, password = $3, role = $4 WHERE id = $5",
            [name, email, passwordHashed, role, id]
          );
          newUser = response.rows[0];
          res.json({
            successMsg: "User created!",
            user: {
              id: newUser.id,
              name: newUser.name,
              email: newUser.email,
              role: newUser.role,
            },
          });
        } catch (err) {
          res.status(500).json({ err: err.message });
        }
      });
    });
  });
};
