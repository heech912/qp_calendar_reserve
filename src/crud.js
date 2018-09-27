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
  database: "zoocarsample"
});

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.delete('/del', function(req,res){
  con.query("DELETE from calendar_reserve WHERE startDate >= '1999-01-01'")
  res.send('completely deleted successfully')
})

router.post("/", function(req, res) {
  con.query(`INSERT INTO calendar_reserve values(${req.body.date})`);
  res.send(req.body);
});

router.get("/", function(req, res) {
  con.query("SELECT * from calendar_reserve", (err, result) => {
    if (err) throw err;
    res.send(result);
    console.log(result);
  });
});


module.exports = router;
