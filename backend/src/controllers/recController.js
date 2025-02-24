/**
 * Restrict recruiter-specific actions (viewing applications, hiring, ..)
 */
const {getApplicantsData} = require("../integration/recIntegration"); // Import integration layer

/**
 * @function getApplicationData
 * @description Retrieves all applications from the database and returns them to the client.
 * @param {Object} req - Express request object representing the HTTP request
 * @param {Object} res - Express response object used to send the HTTP response
 * @returns {Object} JSON response containing the applications data or an error message
 */
const getApplicationData = async (req, res) => {
    try {
        const applications = await getApplicantsData(); // Call integration function
        res.status(200).json(applications);
    } catch (error) {
        console.error("Error fetching applications:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { getApplicationData };
