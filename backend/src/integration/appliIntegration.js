/**
 * This file contains functions for processing job applications, including handling
 * the applicant's competencies and availability. It connects to the database models for
 * `CompetenceProfile`, `Availability`, and `Competence`.
 */
const { Availability, CompetenceProfile, Competence } = require('../models');

/**
 * Creates a new job application by saving the applicant's competences and availability.
 *
 * This function processes the competences and availability data provided by the applicant
 * and creates corresponding records in the database for each. It first looks up the competence
 * names to find their respective IDs, then creates entries in both the 'Availability' and 'CompetenceProfile' tables.
 *
 * @param {number} person_id - The ID of the person submitting the application.
 * @param {Array} competences - A list of the applicant's competencies, each including an 'expertise' and 'years_of_experience'.
 * @param {Array} availability - A list of the applicant's availability periods, each with a 'from_date' and 'to_date'.
 * @param {Object} transaction - Sequelize transaction object.
 * @throws {Error} If any of the expertise values do not exist in the `Competence` table.
 */
const createApplication = async (person_id, competences, availability, transaction) => {
    const competenceIds = await Promise.all(
        competences.map(async ({ expertise, years_of_experience }) => {
            const competence = await Competence.findOne({ where: { name: expertise }, transaction });

            if (!competence) {
                throw new Error(`Invalid expertise: ${expertise}`);
            }

            return { competence_id: competence.competence_id, years_of_experience };
        })
    );

    await Promise.all(
        availability.map(async ({ from_date, to_date }) => {
            await Availability.create({ person_id, from_date, to_date }, { transaction });
        })
    );

    await Promise.all(
        competenceIds.map(async ({ competence_id, years_of_experience }) => {
            await CompetenceProfile.create({ person_id, competence_id, years_of_experience }, { transaction });
        })
    );
};

module.exports = { createApplication };