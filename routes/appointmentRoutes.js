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
    var types = require("pg").types;
    var Moment = require("moment");
    var parseDate = function parseDate(val) {
      return val === null ? null : Moment(val).format("YYYY-MM-DD");
    };
    //var types = pg.types;
    var DATATYPE_DATE = 1082;
    types.setTypeParser(DATATYPE_DATE, function (val) {
      return val === null ? null : parseDate(val);
    });

    var resultArray = [];

    try {
      var dbEntries = await pool.query(
        "SELECT * FROM appointments WHERE date >= CURRENT_DATE ORDER BY date;"
      );
      console.log("RESPONSE FROM DB");
      console.log(dbEntries.rows);
      console.log(dbEntries.rows[0]);
      // dbEntries.rows = dbEntries.rows.reverse();
      // console.log(dbEntries.rows);
      // console.log(dbEntries.rows[0]);

      //const allNews = await pool.query("SELECT * FROM news;");

      const testDate = new Date().setDate(new Date().getDate() + 1);
      const currentDate = new Date();
      console.log("CURRENT DATE");
      console.log(
        currentDate.getDay(),
        currentDate.getDate(),
        currentDate.getMonth(),
        currentDate.getFullYear()
      );
      var offset = 0;
      var index = 0;
      var offsetDelta = 0;
      switch (currentDate.getDay()) {
        case 0:
          offset += 1;
        case 1:
          offset += 2;
          index = 0;
          break;
        case 2:
          offset += 1;
          break;
        case 3:
          offset += 3;
          index = 1;
          offsetDelta = -3;
          break;
        case 4:
          offset += 1;
        case 5:
          offset += 1;
        case 6:
          offset += 2;
          index = 2;
          break;
        default:
          offset = 0;
      }

      const offsetTable = [2, 3, 2];
      for (let i = 0; i < 20; i++) {
        console.log("OFFSET");
        console.log(offset);
        console.log("INDEX");
        console.log(index);
        console.log("TABLE");
        console.log(offsetTable[index]);

        const wtfDate = new Date().setDate(new Date().getDate() + offset + offsetDelta);
        const someDate = parseDate(new Date(wtfDate));

        console.log("COMPARE 2 DATES");
        console.log(someDate);
        //console.log(parseDate(dbEntries.rows[0].date));
        //console.log(dbEntries.rows[0]);
        //console.log(parseDate(dbEntries.rows[0].date) == someDate);

        console.log("IF STATEMENTS");
        console.log(
          !(dbEntries.rows === undefined || dbEntries.rows.length == 0)
        );
        //console.log(dbEntries.rows[0].date == someDate);
        console.log("THE DATES");
        //console.log(dbEntries.rows[0].date)
        console.log(someDate);
        //console.log(new Date().setDate(currentDate.getDate() + offset));

        if (
          !(dbEntries.rows === undefined || dbEntries.rows.length == 0) &&
          parseDate(dbEntries.rows[0].date) == someDate
        ) {
          console.log("First case with some dates in db");
          console.log(dbEntries.rows);
          resultArray.push(dbEntries.rows.shift());
          console.log(dbEntries.rows);
        } else {
          if (resultArray.length === 99) {
            switch (new Date().getDay()) {
              case 1:
              case 3:
              case 6:
                resultArray.push({ date: new Date(), name: "tba" });
                break;
              case 0:
              case 2:
              case 5:
                resultArray.push({
                  date: new Date().setDate(new Date().getDate() + 1),
                  name: "tba",
                });
                break;
              case 4:
                resultArray.push({
                  date: new Date().setDate(new Date().getDate() + 2),
                  name: "tba",
                });
                break;
              default:
                break;
            }
          }

          console.log("Second case with no dates in db");
          const newDate = new Date().setDate(new Date().getDate() + offset + offsetDelta);
          //const newDate = new Date().setDate(currentDate.getDate() + offset);
          const date = new Date(newDate);
          console.log("NEW DATE");
          console.log(
            date.getDay(),
            date.getDate(),
            date.getMonth(),
            date.getFullYear()
          );

          resultArray.push({ date: newDate, name: "tba" });
        }
        if(offsetDelta == 0){
        index = (index + 1) % 3;
        offset += offsetTable[index];
        }

        console.log("RESULT ARRAY")
        console.log(resultArray);
        offsetDelta = 0;

        console.log("______________________");
      }
      res.send(resultArray.splice(0, 20));
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ err: err.message });
    }
  });

  app.post("/api/appointments",  async (req, res) => {
    try {
      const { name, date } = req.body;

      console.log(date);
      var moment = require("moment-timezone");
      var dbDate = moment(date).utcOffset(120).format("YYYY-MM-DD HH:mm");

      const newAppointment = await pool.query(
        "INSERT INTO appointments (name, date)   VALUES($1, $2) RETURNING *",
        [name, dbDate]
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


  app.put("/api/appointments",  async (req, res) => {
    try {
      const {id, name, date } = req.body;

      console.log(date);

      if (!id || !name || !date) {
        console.log("NONONON!");

        return res.status(400).json({ msg: "Please enter all fields!" });
      }
  
      const appointment = await pool.query("SELECT * FROM appointments WHERE id = $1", [
        id,
      ]);
      if (appointment.rowCount == 0) {
        return res.status(400).json({ msg: "Such appointment doesn't exist!" });
      }

      var moment = require("moment-timezone");
      var dbDate = moment(date).utcOffset(120).format("YYYY-MM-DD HH:mm");

      const newAppointment = await pool.query(
        "UPDATE appointments SET name = $1, date = $2 WHERE id = $3",
        [name, dbDate, id]
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

};


