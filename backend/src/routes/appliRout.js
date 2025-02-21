const express = require("express");
const { authenticateToken, authorizeRoles } = require("../middlewares/authMiddleware");
const { submitApplication } = require("../controllers/appliController");
const router = express.Router();

/**
 * @module appliRoutes
 * @description Defines routes accessible only by applicants.
 */

router.post("/apply", authenticateToken, authorizeRoles([2]), submitApplication);

module.exports = router;
