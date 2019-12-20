var express = require('express');
var router = express.Router();
const user = require('../controllers/users')

/* GET users listing. */
router.get('/', function (req, res) {
  user.getAllUser(req, res)
});
router.post('/addUser', function (req, res) {
  user.addUser(req, res)
});
module.exports = router;
