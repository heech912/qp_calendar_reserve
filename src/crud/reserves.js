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
  let newReserve = req.body;
  console.log(newReserve);
  con.query("SELECT REPLACE(uuid(),'-','') AS uuid ", (err, result) => {
    con.query(
      `INSERT INTO reserves values('${newReserve.dealerID}','${
        newReserve.carID
      }','${newReserve.startDate}','${newReserve.finishDate}','${
        result[0].uuid
      }')`
    )
    console.log(result);
  });
  res.send(req.body);
});

router.delete("/:ID", function(req, res) {
  con.query(`DELETE from reserves WHERE ID = '${req.params.ID}' `,
  (err, result) => {
    if (err) throw err;
    console.log(result);
  })
});

router.get("/:account.:ID", function(req, res) {
  con.query(
    `SELECT * from reserves WHERE
    ${req.params.account == "dealers" ? "dealerID" : "carID"}
    = ${req.params.ID}`,
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

module.exports = router;
