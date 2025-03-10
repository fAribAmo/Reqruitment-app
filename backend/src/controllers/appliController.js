/**
 * This file contains a function to handle the submission of job applications.
 * It processes the incoming application data, performs validation, and invokes
 * the integration layer to create the application in the database.
 * 
 */

const { createApplication } = require('../integration/appliIntegration');
const { withTransaction } = require('../integration/transactionManager.js');


/**
 * Handles the submission of a job application by the applicant.
 * 
 * This function receives the application data (person_id, expertiseEntries, availability) from the request body,
 * validates the presence of required fields, and then calls the `createApplication` function from the integration layer
 * to store the data in the database. In case of success or failure, it responds with an appropriate HTTP status code and message.
 *
 * @param {Object} req - The request object containing the application data.
 * @param {Object} res - The response object used to send back the result to the client.
 * 
 * @returns {Promise<void>} Responds with `{ message: string }`
 */
const submitApplication = async (req, res) => {
    try {
        console.log("Received application data:", req.body);
        console.log("Headers:", req.headers);

        const { person_id, expertiseEntries, availability } = req.body;

        if (!person_id || !expertiseEntries || !availability) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        await withTransaction(async () => {
            await createApplication(person_id, expertiseEntries, availability); 
        });

        res.status(201).json({ message: "Application submitted successfully" });
    } catch (error) {
        console.error("Error applying for job:", error.message);

        if (error.message.startsWith("Invalid expertise")) {
            return res.status(400).json({ message: error.message });
        }

        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { submitApplication };