/**
 * Controller for handling application related requests
 */
const { createApplication } = require('../integration/appliIntegration');

const applyForJob = async (req, res) => {
    try {
        console.log("Received application data:", req.body); 
        const { person_id, expertiseEntries, availability } = req.body;

        if (!person_id || !expertiseEntries || !availability) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        await createApplication(person_id, expertiseEntries, availability);

        return res.status(201).json({ message: "Application submitted successfully" });
    } catch (error) {
        console.error("Error applying for job:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { applyForJob };
