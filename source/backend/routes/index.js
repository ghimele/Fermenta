var express = require('express');
var utils = require('../utils');
var router = express.Router();
var middleware = require('../middleware');

// API home
router.get('/', function(req, res, next) {
  res.json({ message: "Hello from server!" });
});

// ********************
// Programs API - start
// ********************

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

// ********************
// Programs API - end
// ********************

// ********************
// JOBS API - start
// ********************

// Create new job using programid
router.post('/job/:programid',middleware.programs.createJob, function(req, res, next) {
  res.json({ error: false, message: req.message });
});

// Get job using id
router.get('/job/:id',middleware.programs.getJob, function(req, res, next) {
  res.json({ error: false, message: req.data });
});

// Update program by ID
router.put('/job/:id',middleware.programs.updateJob, function(req, res, next) {
  res.json({ error: false, message: req.message });
});

// Get all jobs
router.get('/jobs',middleware.programs.getJobs, function(req, res, next) {
  res.json({ error: false, message: req.data });
});

// Get Scheduled Program
router.get('/runningprogram/',middleware.programs.getRunningProgram, function(req, res, next) {
  res.json({ error: false, message: req.data });
});

// ********************
// JOBS API - end
// ********************

// ********************
// JOB LOGS API - start
// ********************

// Get Job's logs
router.get('/joblog/:jobid',middleware.programs.getJobLog, function(req, res, next) {
  res.json({ error: false, message: req.data });
});

// ********************
// JOB LOGS API - end
// ********************


// ********************
// SETTINGS API - start
// ********************

// Get Settings
router.get('/settings',middleware.programs.getSettings, function(req, res, next) {
  res.json({ error: false, message: req.data });
});

// Update settings
router.put('/settings',middleware.programs.updateSettings, function(req, res, next) {
  res.json({ error: false, message: req.message });
});

// ********************
// SETTINGS API - end
// ********************


module.exports = router;
