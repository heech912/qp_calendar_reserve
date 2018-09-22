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

router.post("/ugly", function(req, res) {
  con.query("INSERT INTO calendar_reserve values('2000-01-01', '2021-11-07')");
});


router.get("/main", function(req, res) {

  con.query("SELECT * from calendar_reserve", (err, result) => {
    if (err) throw err;
    res.send(result);
    console.log(result);
  });
});


module.exports = router;
