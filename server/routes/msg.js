var express = require('express');
var router = express.Router();
const msg = require('../controllers/msg')
/* GET home page. */
router.get('/', function (req, res) {
  msg.getAllMsg(req, res)
});
router.post('/addMsg', function (req, res) {
  msg.addMsg(req, res)
});

module.exports = router;
