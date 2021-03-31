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

// Create new program
router.post('/program',middleware.programs.createProgram, function(req, res, next) {
  res.json({ error: false, message: req.message });
});

// Update program by ID
router.put('/program/:id',middleware.programs.updateProgram, function(req, res, next) {
  res.json({ error: false, message: req.message });
});

// Update program by ID
router.delete('/program/:id',middleware.programs.deleteProgram, function(req, res, next) {
  res.json({ error: false, message: req.message });
});

// Get Scheduled Program
router.get('/scheduledprogram/',middleware.programs.getScheduledProgram, function(req, res, next) {
  res.json({ error: false, message: req.data });
});

module.exports = router;
