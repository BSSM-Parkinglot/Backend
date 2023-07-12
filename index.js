const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const fs = require("fs");
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`node start ${port}`);
});
