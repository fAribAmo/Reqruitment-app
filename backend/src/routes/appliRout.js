/**
 * This route receives a request to apply for a job.
 */
const express = require('express');
const { applyForJob } = require('../controllers/appliController');
const router = express.Router();

router.post('/apply', applyForJob);


module.exports = router;