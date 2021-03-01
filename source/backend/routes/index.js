var express = require('express');
var utils = require('../utils');
var router = express.Router();
var middleware = require('../middleware');

// API home
router.get('/', function(req, res, next) {
  res.json({ message: "Hello from server!" });
});

// Get all programs stored into Main DB
router.get('/programs',middleware.programs.getPrograms, function(req, res, next) {
  res.json({ error: false, programs: req.data });
});

//utils.db.UpdateProgram(req.params.id, req.body)
// Update program by ID
router.put('/program/:id',middleware.programs.updateProgram, function(req, res, next) {
  res.json({ error: false, message: req.message });
});

module.exports = router;
