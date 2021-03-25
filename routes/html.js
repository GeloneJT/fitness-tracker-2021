const router = require("express").Router();

router.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/excerise.html"));
});

router.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/stats.html"));
});

module.exports = router;
