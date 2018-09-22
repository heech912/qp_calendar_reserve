var express = require("express");
var bodyParser = require("body-parser");
var mysql = require("mysql");
//var path = require("path"); dir_
var app = express();
var port = 3000;

app.use("/crud", require("./crud"));
app.use("/", express.static("./client/build"));




const server = app.listen(port, () => {
  console.log("Express listening on port", port);
});
