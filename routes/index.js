const router = require("express").Router();
const db = require("../db/connection");

// route => /api/movies
// READ ALL MOVIES
router.get("/movies", (req, res) => {
  const sql = "SELECT id, movie_name AS title FROM movies;";
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(rows);
  });
});

// route => /api/add-movie
// CREATE A MOVIE
router.post("/add-movie", (req, res) => {
  const sql = "INSERT INTO movies (movie_name) VALUES (?)";
  const params = [req.body.title];

  db.query(sql, params, (err, results) => {
    if (err) {
      res.status(500).json({ error: err });
      return;
    }
    res.json({ rowsAdded: results.affectedRows, data: req.body });
  });
});

// route => /api/movie/:id
// DELETE A MOVIE
router.delete("/movie/:id", (req, res) => {
  const sql = "DELETE FROM movies WHERE id = ?";
  db.query(sql, req.params.id, (err, result) => {
    if (err) {
      res.statusMessage(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: "Movie not found",
      });
    } else {
      res.json({
        message: "deleted",
        changes: result.affectedRows,
        id: req.params.id,
      });
    }
  });
});

// route => /api/movie-reviews
// READ ALL REVIEWS ORDERED BY MOVIE NAME
router.get("/movie-reviews", (req, res) => {
  const sql = `SELECT movies.movie_name AS movie, reviews.review FROM reviews LEFT JOIN movies ON reviews.movie_id = movies.id ORDER BY movies.movie_name;`;
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

// route => /api/review/:id
// UPDATE REVIEW
router.put("/review/:id", (req, res) => {
  const sql = "UPDATE reviews SET review = ? WHERE id = ?";
  const params = [req.body.review, req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err });
      return;
    } else if (!result.affectedRows) {
      res.json({ message: "Movie not found" });
      return;
    }
    res.json({
      data: req.body,
      changes: result.affectedRows,
    });
  });
});

module.exports = router;
