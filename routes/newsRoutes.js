const cors = require("cors");
const pool = require("../database");
const auth = require('../middleware/auth');
const { cloudinary } = require("../utils/cloudinary");

module.exports = (app) => {
  app.post("/api/image_upload", auth, async (req, res) => {
    try {
      const { title, preview_text, body, created_at } = req.body;
      const fileStr = req.body.image_url;

      const uploadResponse = await cloudinary.uploader.upload(fileStr, {
        upload_preset: "dev_setups",
      });

      const image_url = uploadResponse.public_id;

      const newNews = await pool.query(
        "INSERT INTO news (title, preview_text, body, created_at, image_url)   VALUES($1, $2, $3, $4, $5) RETURNING *",
        [title, preview_text, body, created_at, image_url]
      );

      res.json(newNews);

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
    const allNews = await pool.query("SELECT * FROM news;");
    
    res.send(allNews.rows);
  });

  app.delete("/api/news/:id", auth, async (req, res) => {
    try {
      const { id } = req.params;
      const deleteNews = await pool.query("DELETE FROM news WHERE id = $1", [
        id,
      ]);
      res.json("News were deleted");
    } catch (err) {
        res.status(500).json({ err: "Smth went wrong" });
    }
  });


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
      res.json("News were updated");
    } catch (err) {
      console.err.message;
    }
  });


};
