const cors = require('cors');
const pool = require('../database');

module.exports = (app) => {

  app.get("/news", async (req, res) => {
    const allNews = await pool.query("SELECT * FROM news;");
    res.json(allNews.rows);
  });

  app.post("/news", async (req, res) => {
    try {
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
      console.log(id);
      console.log(title);
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
