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

    try {
      var dbResponce = await pool.query("SELECT * FROM rowingdays;");
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ err: err.message });
    }

    console.log("ROWINGDAYS");
    console.log(dbResponce.rows[0]);

    var resultArray = [];
    var rowingDays = dbResponce.rows[0].days;
    const numberOfCards = dbResponce.rows[0].amount;
    const defaultTime = dbResponce.rows[0].time;

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

      // ****** Calculate table ******
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
      console.log(offsetTable);

      // ******* ******* ******* ******

      const testDate = new Date(new Date().setDate(new Date().getDate() + 0));
      const currentDate = new Date();
      console.log("DATE COMPARE YEEEEEES");
      console.log(currentDate);
      console.log(testDate);
      console.log(
        testDate.getDay(),
        testDate.getDate(),
        testDate.getMonth() + 1,
        testDate.getFullYear()
      );
      var offset = 0;
      var index = 0;
      var offsetDelta = 0;
      // var currentDay = testDate.getDay();
      var currentDay = testDate.getDay();
      //console.log

      console.log("****** LOOP ******");
      var day = currentDay;
      for (let i = 0; i < 7; i++) {
        console.log("DAY");
        console.log(day);
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

        console.log("OFFSET");
        console.log(offset);
        console.log("INDEX");
        console.log(index);
        console.log("TABLE");
        console.log(offsetTable[index]);
        console.log("DELTA");
        console.log(offsetDelta);
        console.log("************");
      }

      /*******************
       ****** SWITCH ******
       ********************/
      /*
      switch (currentDay) {
        case 0:
          offset +=
            rowingDays.filter((d) => d > currentDay)[0] + offset - currentDay;
          console.log("OFFSET IN SWITCH!");
          console.log(offset);
        //break;
        case 1:
          offset +=
            rowingDays.filter((d) => d > currentDay)[0] + offset - currentDay;
          console.log("OFFSET IN SWITCH!");
          console.log(offset);
          index = 0;
          offsetDelta = -2;
          break;
        case 2:
          offset +=
            rowingDays.filter((d) => d > currentDay)[0] + offset - currentDay;
        //break;
        case 3:
          offset +=
            rowingDays.filter((d) => d > currentDay)[0] + offset - currentDay;
          index = 1;
          offsetDelta = -3;
          break;
        case 4:
          if (rowingDays.includes(4)) {
            offset +=
              rowingDays.filter((d) => d > currentDay)[0] + offset - currentDay;
          } else {
            offset += 1;
          }
          console.log("OFFSET IN SWITCH!");
          console.log(offset);
        //break;
        case 5:
          if (rowingDays.includes(5)) {
            offset +=
              rowingDays.filter((d) => d > currentDay)[0] + offset - currentDay;
          } else {
            offset += 1;
          }
          console.log("OFFSET IN SWITCH!");
          console.log(offset);
        // break;
        case 6:
          offset +=
            rowingDays.filter((d) => d > currentDay)[0] + offset - currentDay;
          index = 2;
          offsetDelta = -2;
          console.log("OFFSET IN SWITCH!");
          console.log(offset);
          break;
        default:
          offset = 0;
      }


*/

      /*****************
       **** THE LOOP ****
       ******************/

      //const offsetTable = [2, 3, 2];
      for (let i = 0; i < numberOfCards; i++) {
        console.log("OFFSET");
        console.log(offset);
        console.log("INDEX");
        console.log(index);
        console.log("TABLE");
        console.log(offsetTable[index]);
        console.log("DELTA");
        console.log(offsetDelta);

        var wtfDate = new Date().setMonth(testDate.getMonth());
        wtfDate = new Date(wtfDate).setDate(
          testDate.getDate() + offset + offsetDelta
        );
        // const wtfDate = new Date().setDate(new Date().getDate() + offset + offsetDelta);
        const someDate = parseDate(new Date(wtfDate));

        console.log("COMPARE 2 DATES");
        console.log(someDate);
        // console.log(parseDate(dbEntries.rows[0].date));
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
        console.log(
          new Date(new Date().setDate(currentDate.getDate() + offset))
        );

        if (
          !(dbEntries.rows === undefined || dbEntries.rows.length == 0) &&
          parseDate(dbEntries.rows[0].date) == someDate
        ) {
          console.log("First case with some dates in db");
          console.log(dbEntries.rows);
          resultArray.push(dbEntries.rows.shift());
          console.log(dbEntries.rows);
        } else {
          /*
          if (resultArray.length === 99) {
            switch (new Date().getDay()) {
              case 1:
              case 3:
              case 6:
                resultArray.push({ date: new Date(), name: "tba", info: "" });
                break;
              case 0:
              case 2:
              case 5:
                resultArray.push({
                  date: new Date().setDate(new Date().getDate() + 1),
                  name: "tba",
                  info: ""
                });
                break;
              case 4:
                resultArray.push({
                  date: new Date().setDate(new Date().getDate() + 2),
                  name: "tba",
                  info: ""
                });
                break;
              default:
                break;
            }
          }
          */

          console.log("Second case with no dates in db");
          const newDate = someDate;
          // const newDate = new Date().setDate(testDate.getDate() + offset + offsetDelta);
          //const newDate = new Date().setDate(new Date().getDate() + offset + offsetDelta);
          //const newDate = new Date().setDate(currentDate.getDate() + offset);
          const date = new Date(newDate);
          console.log("NEW DATE");
          console.log(
            date.getDay(),
            date.getDate(),
            date.getMonth() + 1,
            date.getFullYear()
          );

          resultArray.push({ date: newDate, name: "-", info: "", time: defaultTime });
        }
        if (offsetDelta == 0) {
          index = (index + 1) % offsetTable.length;
          offset += offsetTable[index];
        }

        console.log("RESULT ARRAY");
        console.log(resultArray);
        offsetDelta = 0;
        console.log("______________________");
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

      console.log(date);
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

      console.log(date);

      if (!id || !name || !date || !time) {
        console.log("NONONON!");
        return res.status(400).json({ msg: "Please enter all fields!" });
      }

      const appointment = await pool.query(
        "SELECT * FROM appointments WHERE id = $1",
        [id]
      );
      console.log("DID WORK!");

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
    console.log(req.body);
    const { rowingdays, time, cardsAmount } = req.body;
    const id = 1;
    if (!rowingdays || !time || !cardsAmount || rowingdays.length == 0) {
      return res.status(400).json({ msg: "Please enter all fields!" });
    }
    console.log("DID WORK")

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
        console.log("hey ho we passed update part")
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
