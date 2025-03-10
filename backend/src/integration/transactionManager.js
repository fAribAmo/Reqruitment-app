const sequelize = require('../config/dbConnection');

/**
 * Handles database transactions.
 * @param {Function} transactionCallback - The function containing database operations.
 * @returns {Promise<any>} The result of the transaction.
 */
async function withTransaction(transactionCallback) {
    return await sequelize.transaction(async () => {  // ingen (t) eftersom CLS hanterar det
        try {
            return await transactionCallback();
        } catch (error) {
            console.error("Transaction failed:", error.message);
            throw error; // Rollback sker automatiskt
        }
    });
}


module.exports = { withTransaction };
