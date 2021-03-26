const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname, "public"));

// Bring in mongoose.connect

app.use(require("./routes/api.js"));
app.use(require("./routes/html.js"));

app.listen(PORT, () => {
  console.log(`My app is running on ${PORT}`);
});
