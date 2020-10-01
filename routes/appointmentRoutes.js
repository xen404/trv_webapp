const cors = require("cors");
const pool = require("../database");
const isLoggedIn = require("../middleware/isLoggedIn");
const isAdmin = require("../middleware/isAdmin");
const { cloudinary } = require("../utils/cloudinary");

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

module.exports = (app) => {
  app.get("/api/appointments", async (req, res) => {
    var resultArray = [];

    try {
      var dbEntries = await pool.query(
        "SELECT * FROM appointments WHERE date > CURRENT_DATE;"
      );
      //const allNews = await pool.query("SELECT * FROM news;");
      console.log("RESPONSE FROM DB");
      console.log(dbEntries.rows);
      const currentDate = new Date();
      var offset = 0;
      var index = 0;
      switch (currentDate.getDay) {
        case 1:
          offset = 2;
          index = 0;
        case 4:
          offset = 2;
          index = 1;
        case 6:
          offset = 3;
          index = 2;
        default:
          offset = 0;
      }

      const offsetTable = [2, 3, 2];
      for (let i = 0; i < 20; i++) {
        if (
            !(dbEntries.rows === undefined || dbEntries.rows.length == 0) &&
          dbEntries.rows[0].date == currentDate.setDate(currentDate.getDate + 1)
        ) {
          console.log(currentDate);
          resultArray.push(dbEntries.rows.pop());
        } else {
          resultArray.push({ date: currentDate, name: "" });
        }
        offset += offsetTable[index];
        index = (index + 1) % 3;
      }
      res.send(resultArray);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ err: err.message });
    }
  });

  app.post("/api/appointments", async (req, res) => {
    try {
      const name = "Christian";
      var year = new Date().getFullYear();
      console.log(year);
      var month = new Date().getMonth();
      var date = new Date(year, month, 1);
      date = new Date();
      console.log(date);

      const newNews = await pool.query(
        "INSERT INTO appointments (name, date)   VALUES($1, $2) RETURNING *",
        [name, date]
      );
      res.send(newNews);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ err: "Smth went wrong" });
    }
  });
};
