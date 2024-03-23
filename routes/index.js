var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.cookie("cookieName", "randm Value")
  res.send("hi from random")
});

module.exports = router;
