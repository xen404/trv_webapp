const cors = require("cors");
const pool = require("../database");
const auth = require('../middleware/auth');
const { cloudinary } = require("../utils/cloudinary");

module.exports = (app) => {
  app.post("/api/image_upload", auth, async (req, res) => {
    try {
      console.log("IMAGE was recived by REST layer!");
      const { title, preview_text, body, created_at } = req.body;
      const fileStr = req.body.image_url;
      //console.log(fileStr);

      const uploadResponse = await cloudinary.uploader.upload(fileStr, {
        upload_preset: "dev_setups",
      });

      const image_url = uploadResponse.public_id;
      console.log(image_url);

      const newNews = await pool.query(
        "INSERT INTO news (title, preview_text, body, created_at, image_url)   VALUES($1, $2, $3, $4, $5) RETURNING *",
        [title, preview_text, body, created_at, image_url]
      );

      res.json(newNews);

      //res.json({ msg: "YATAAYAYAYYA" });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ err: "Smth went wrong" });
    }
  });

  app.get("/api/images", async (req, res) => {
    const { resources } = await cloudinary.search
      .expression("public_id:trv_news/z7nvuy05gf9tzgnzlbbt")
      .sort_by("public_id", "desc")
      .max_results(30)
      .execute();
    const publicIds = resources.map((file) => file.public_id);
    res.send(publicIds);
  });

  app.get("/api/news", async (req, res) => {
    console.log("API worx!");
    const allNews = await pool.query("SELECT * FROM news;");
    //res.json(allNews.rows);
    console.log(allNews.rows);
    console.log(allNews.rows);
    res.send(allNews.rows);
  });


  /*
  app.post("/news", async (req, res) => {
    try {
      console.log("REST layer works");
      console.log(req.body);
      const { title } = req.body;
      const newNews = await pool.query(
        "INSERT INTO news (title) VALUES($1) RETURNING *",
        [title]
      );

      res.json(newNews);
      console.log(req.body);
    } catch (err) {
      console.error(err.message);
    }
  });
  */

  app.get("/news/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const news = await pool.query("SELECT * FROM news WHERE id = $1", [id]);
      res.json(news.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });

  app.put("/news/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { title } = req.body;
      const updateNews = await pool.query(
        "UPDATE news SET title = $1 WHERE id = $2",
        [title, id]
      );
      console.log(title);
      console.log(id);
      console.log(updateNews);
      res.json("News were updated");
    } catch (err) {
      console.err.message;
    }
  });

  app.delete("/news/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleteNews = await pool.query("DELETE FROM news WHERE id = $1", [
        id,
      ]);
      res.json("News were deleted");
    } catch (err) {
      console.err.message;
    }
  });
};
