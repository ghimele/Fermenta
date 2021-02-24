var express = require('express');
var utils = require('../utils');
var router = express.Router();


router.get('/programs', function(req, res, next) {
  res.json({ programs: utils.db.GetPrograms() });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ message: "Hello from server!" });
});



module.exports = router;
