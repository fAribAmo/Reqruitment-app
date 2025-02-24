const express = require("express");
const { authenticateToken, authorizeRoles } = require("../middlewares/authMiddleware");
const { getApplicationData } = require("../controllers/recController");
const router = express.Router();

/**
 * @module recRoutes
 * @description Defines routes accessible only by recruiters.
 */

router.get("/recruiter", authenticateToken, authorizeRoles([1]), getApplicationData);

module.exports = router;