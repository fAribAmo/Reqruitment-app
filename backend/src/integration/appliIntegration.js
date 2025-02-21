/**
 * Integration layer for handling job applications.
 */
const { Availability, CompetenceProfile, Competence } = require('../models');

const createApplication = async (person_id, competences, availability) => {
    
    const competenceIds = await Promise.all(
        competences.map(async ({ expertise, years_of_experience }) => {
            const competence = await Competence.findOne({ where: { name: expertise } });

            if (!competence) {
                throw new Error(`Invalid expertise: ${expertise}`);
            }

            return { competence_id: competence.competence_id, years_of_experience };
        })
    );

    await Promise.all(
        availability.map(async ({ from_date, to_date }) => {
            await Availability.create({ person_id, from_date, to_date });
        })
    );

    await Promise.all(
        competenceIds.map(async ({ competence_id, years_of_experience }) => {
            await CompetenceProfile.create({ person_id, competence_id, years_of_experience });
        })
    );
};

module.exports = { createApplication };
