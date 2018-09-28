var express = require("express");
var bodyParser = require("body-parser");
var mysql = require("mysql");
//var path = require("path"); dir_
var app = express();
var port = process.env.PORT || 8080;

app.use("/cars", require("./crud/cars"));
app.use("/dealers", require("./crud/dealers"));
app.use("/stores", require("./crud/stores"));
app.use("/reserves", require("./crud/reserves"));
app.use("/", express.static("./client/build"));

const server = app.listen(port, () => {
  console.log("Express listening on port", port);
});

/*db init query : create table cars (ID int, model varchar(20), storeID int, name varchar(20));
create table dealers (ID int, storeID int, name varchar(20)); create table stores (ID int, name varchar(20)); create table reserves (dealerID int, carID int, startTime timestamp, finishTime timestamp, ID char(32))*/
