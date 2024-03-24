var express = require('express');
const { register, login, ran } = require('../controllers/user');
const authenticateUser = require('../middleware/authenticate');
var router = express.Router();

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/ran").get(authenticateUser, ran)

module.exports = router;
