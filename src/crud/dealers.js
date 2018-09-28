var express = require("express");
var bodyParser = require("body-parser");
var mysql = require("mysql");
var config = require("../config/db_config.json")

var app = express();
var router = express.Router();
var con = mysql.createConnection(config);


router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post("/", function(req, res) {
  let newAccount = req.body;
  con.query(
    `INSERT INTO dealers values('${newAccount.ID}','${newAccount.store}','${
      newAccount.name
    }')`
  );
  res.send(req.body);
});

router.get("/:ID", function(req, res) {
  con.query(`SELECT DISTINCT * from dealers WHERE ID =${req.params.ID}`, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

module.exports = router;
