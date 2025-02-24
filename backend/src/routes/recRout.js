const express = require("express");
const { authenticateToken, authorizeRoles } = require("../middlewares/authMiddleware");
const { getRecruiterData } = require("../controllers/recController");
const router = express.Router();

/**
 * @module recRoutes
 * @description Defines routes accessible only by recruiters.
 */

router.get("/recruiter-data", authenticateToken, authorizeRoles([1]), listAllApplications);

module.exports = router;

