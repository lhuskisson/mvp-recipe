require("dotenv").config();
const express = require("express");
const db = require("./db/conn");
const app = express();
const PORT = process.env.PORT || 5000

app.use(express.static("public"));
app.use(express.json());





app.listen(PORT, () => {
  console.log(`listening on Port ${PORT}`);
});