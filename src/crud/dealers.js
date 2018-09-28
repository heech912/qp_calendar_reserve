var express = require("express");
var bodyParser = require("body-parser");
var mysql = require("mysql");
var config = require("../../config")

const options = {
  user: config.get('MYSQL_USER'),
  password: config.get('MYSQL_PASSWORD'),
  database: 'zoocarSample'
};

if (config.get('INSTANCE_CONNECTION_NAME') && config.get('NODE_ENV') === 'production') {
  options.socketPath = `/cloudsql/${config.get('INSTANCE_CONNECTION_NAME')}`;
}

var app = express();
var router = express.Router();
var con = mysql.createConnection(options);

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
