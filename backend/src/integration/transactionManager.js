const sequelize = require('../config/dbConnection');

/**
 * Handles database transactions.
 * @param {Function} transactionCallback - The function containing database operations.
 * @returns {Promise<any>} The result of the transaction.
 */
async function withTransaction(transactionCallback) {
    return await sequelize.transaction(async (t) => {
        try {
            return await transactionCallback(t);
        } catch (error) {
            console.error("Transaction failed:", error.message);
            throw error;  // Ensures rollback happens automatically
        }
    });
}

module.exports = { withTransaction };
