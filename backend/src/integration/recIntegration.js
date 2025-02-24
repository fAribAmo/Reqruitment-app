// In your integration file (e.g., appliIntegration.js)

const { Person, CompetenceProfile, Competence, Availability } = require('../models'); // Adjust the path to your models

/**
 * @function getApplicantsData
 * @description Retrieves applicants' data, including their competence profiles and availability, from the database.
 * @returns {Array} Formatted list of applicants with details about their competences and availability
 * @throws {Error} If there is an error while fetching data from the database
 */
const getApplicantsData = async () => {
  try {
    const applicants = await Person.findAll({
      include: [
        {
          model: CompetenceProfile,
          include: [
            {
              model: Competence,
              attributes: ['name'], 
            },
          ],
        },
        {
          model: Availability,
          attributes: ['from_date', 'to_date'], 
        },
      ],
    });

    // formatting the data
    const formattedApplicants = applicants.map(applicant => {
      return {
        personId: applicant.person_id, // Add person_id to the response
        fullName: `${applicant.name} ${applicant.surname}`,
        email: applicant.email,
        competences: applicant.CompetenceProfiles.map(profile => profile.Competence.name),
        availability: applicant.Availabilities.map(avail => `${avail.from_date} to ${avail.to_date}`),
      };
    });

    return formattedApplicants;
  } catch (error) {
    console.error("Error fetching applicants data:", error);
    throw new Error("Could not fetch applicants data");
  }
};

module.exports = { getApplicantsData };
