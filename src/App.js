var express = require("express");
var bodyParser = require("body-parser");
var mysql = require("mysql");
//var path = require("path"); dir_
var app = express();
var port = 7777;

app.use("/cars", require("./crud/cars"));
app.use("/dealers", require("./crud/dealers"));
app.use("/stores", require("./crud/stores"));
app.use("/reserves", require("./crud/reserves"));
app.use("/", express.static("./client/build"));




const server = app.listen(port, () => {
  console.log("Express listening on port", port);
});
