var express = require('express');
const { register, login } = require('../controllers/user');
var router = express.Router();

router.route("/register").post(register)
router.route("/login").post(login)

module.exports = router;
