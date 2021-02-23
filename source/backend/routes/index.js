var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Test012345' });
  res.json({ message: "Hello from server!" });
});

module.exports = router;
