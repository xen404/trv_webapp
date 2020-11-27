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
    //********************/
    //*** FORMATE DATE ***/
    //********************/

    var types = require("pg").types;
    var Moment = require("moment");
    var parseDate = function parseDate(val) {
      return val === null ? null : Moment(val).format("YYYY-MM-DD");
    };
    var DATATYPE_DATE = 1082;
    types.setTypeParser(DATATYPE_DATE, function (val) {
      return val === null ? null : parseDate(val);
    });

    try {
      var dbResponce = await pool.query("SELECT * FROM rowingdays;");
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ err: err.message });
    }
    var resultArray = [];
    var rowingDays = dbResponce.rows[0].days;
    const numberOfCards = dbResponce.rows[0].amount;
    const defaultTime = dbResponce.rows[0].time;
    try {
      var dbEntries = await pool.query(
        "SELECT * FROM appointments WHERE date >= CURRENT_DATE ORDER BY date;"
      );

      //******************************/
      //*** CALCULATE OFFSET TABLE ***/
      //******************************/
      var offsetTable = [];
      if (rowingDays.length > 1) {
        for (let i = 0; i < rowingDays.length - 1; i++) {
          offsetTable[i] = rowingDays[i + 1] - rowingDays[i];
        }
        offsetTable[rowingDays.length - 1] =
          7 - rowingDays[rowingDays.length - 1] + rowingDays[0];
      } else {
        offsetTable = [7];
      }
      const currentDate = new Date();
      var offset = 0;
      var index = 0;
      var offsetDelta = 0;
      var day = currentDate.getDay();

      //********************************/
      //*** CALCULATE NEXT ROWINGDAY ***/
      //********************************/

      for (let i = 0; i < 7; i++) {
        if (rowingDays.includes(day)) {
          index = rowingDays.indexOf(day);
          offset += offsetTable[index];
          offsetDelta = -offsetTable[index];
          break;
        } else {
          offset++;
          day++;
          day = day % 7;
        }
      }

      //******************************/
      //*** CREATE ROWINGDAY CARDS ***/
      //******************************/

      for (let i = 0; i < numberOfCards; i++) {
        var tempDate = new Date().setMonth(currentDate.getMonth());
        tempDate = new Date(tempDate).setDate(
          currentDate.getDate() + offset + offsetDelta
        );
        const nextDate = parseDate(new Date(tempDate));
        if (
          !(dbEntries.rows === undefined || dbEntries.rows.length == 0) &&
          parseDate(dbEntries.rows[0].date) == nextDate
        ) {
          resultArray.push(dbEntries.rows.shift());
        } else {
          const newDate = nextDate;
          const date = new Date(newDate);
          resultArray.push({
            date: newDate,
            name: "-",
            info: "",
            time: defaultTime,
          });
        }
        if (offsetDelta == 0) {
          index = (index + 1) % offsetTable.length;
          offset += offsetTable[index];
        }
        offsetDelta = 0;
      }
      res.send(resultArray.splice(0, numberOfCards));
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ err: err.message });
    }
  });

  app.post("/api/appointments", isLoggedIn, async (req, res) => {
    try {
      const { name, date, info, time } = req.body;

      if (!name || !date || !time) {
        return res.status(400).json({ msg: "Please enter all fields!" });
      }

      var moment = require("moment-timezone");
      var dbDate = moment(date).utcOffset(120).format("YYYY-MM-DD HH:mm");

      const newAppointment = await pool.query(
        "INSERT INTO appointments (name, date, info, time)   VALUES($1, $2, $3, $4) RETURNING *",
        [name, dbDate, info, time]
      );
      var types = require("pg").types;
      var Moment = require("moment");
      var parseDate = function parseDate(val) {
        return val === null ? null : Moment(val).format("YYYY-MM-DD");
      };
      var DATATYPE_DATE = 1082;
      types.setTypeParser(DATATYPE_DATE, function (val) {
        return val === null ? null : parseDate(val);
      });

      res.json({
        successMsg: "Appointment created!",
        appointment: newAppointment.rows[0],
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ err: err.message });
    }
  });

  app.put("/api/appointments", isLoggedIn, async (req, res) => {
    try {
      const { id, name, date, info, time } = req.body;

      if (!id || !name || !date || !time) {
        return res.status(400).json({ msg: "Please enter all fields!" });
      }

      const appointment = await pool.query(
        "SELECT * FROM appointments WHERE id = $1",
        [id]
      );

      if (appointment.rowCount == 0) {
        return res.status(400).json({ msg: "Such appointment doesn't exist!" });
      }

      var moment = require("moment-timezone");
      var dbDate = moment(date).utcOffset(120).format("YYYY-MM-DD HH:mm");

      const newAppointment = await pool.query(
        "UPDATE appointments SET name = $1, date = $2, info = $3, time = $4 WHERE id = $5",
        [name, dbDate, info, time, id]
      );
      var types = require("pg").types;
      var Moment = require("moment");
      var parseDate = function parseDate(val) {
        return val === null ? null : Moment(val).format("YYYY-MM-DD");
      };
      var DATATYPE_DATE = 1082;
      types.setTypeParser(DATATYPE_DATE, function (val) {
        return val === null ? null : parseDate(val);
      });

      res.json({
        successMsg: "Appointment created!",
        appointment: newAppointment.rows[0],
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ err: err.message });
    }
  });

  app.put("/api/rowingdays", isLoggedIn, isAdmin, async (req, res) => {
    const { rowingdays, time, cardsAmount } = req.body;
    const id = 1;
    if (!rowingdays || !time || !cardsAmount || rowingdays.length == 0) {
      return res.status(400).json({ msg: "Please enter all fields!" });
    }

    try {
      const response = await pool.query(
        "SELECT * FROM rowingdays WHERE id = $1",
        [id]
      );

      if (response.rowCount == 0) {
        const newRowingdays = await pool.query(
          "INSERT INTO rowingdays (days, time, amount) VALUES($1, $2, $3,) RETURNING *;",
          [rowingdays, time, cardsAmount]
        );
      } else {
        const updatedRowingdays = await pool.query(
          "UPDATE rowingdays SET days = $1, time = $2, amount = $3 WHERE id = $4;",
          [rowingdays, time, cardsAmount, id]
        );
        const emptyTable = await pool.query(
          "DELETE FROM appointments RETURNING *;"
        );
        res.json({
          successMsg: "Calendar updated!",
          appointment: emptyTable.rows[0],
        });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ err: err.message });
    }
  });
};
