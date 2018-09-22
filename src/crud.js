var express = require("express");
var bodyParser = require("body-Parser");
var mysql = require("mysql");

var app = express();
var router = express.Router();
var port = 3000;
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123$qweR",
  database: "qp_test"
});

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get("/", function(req, res) {
  res.set({
    "Content-Type": "application/json"
  });
  con.query("SELECT * from calendar_reserve", (err, result) => {
    if (err) throw err;
    res.send(result);
    console.log(result);
  });
});

app.post("/", function(req, res) {
  con.query("INSERT INTO calendar_reserve values('1996-09-12', '2018-09-25') ");
  res.send(res);
});

module.exports = router;
