var express = require('express');
var utils = require('../utils');
var router = express.Router();

// API home
router.get('/', function(req, res, next) {
  res.json({ message: "Hello from server!" });
});

// Get all programs stored into Main DB
router.get('/programs', function(req, res, next) {
  res.json({ programs: utils.db.GetPrograms() });
});

// Update program by ID
router.put('/program/:id', function(req, res, next) {
  res.json({ message: utils.db.UpdateProgram(req.params.id, req.body) });
});

module.exports = router;
