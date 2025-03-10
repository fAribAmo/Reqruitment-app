/**
 * Restrict recruiter-specific actions (viewing applications, hiring, ..)
 */
const {getApplicantsData} = require("../integration/recIntegration"); // Import integration layer
const { withTransaction } = require('../integration/transactionManager.js');


/**
 * @function getApplicationData
 * @description Retrieves all applications from the database and returns them to the client.
 * @param {Object} req - Express request object representing the HTTP request
 * @param {Object} res - Express response object used to send the HTTP response
 * @returns {Promise<void>} Responds with `{ applications: Array }` or an error message.
 */
const getApplicationData = async (req, res) => {
    try {
        const applications = await withTransaction(async (t) => {
            return await getApplicantsData(t);
        });

        res.status(200).json(applications);
    } catch (error) {
        console.error("Error fetching applications:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { getApplicationData };
