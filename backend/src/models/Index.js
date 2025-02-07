const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false,
});

const Person = sequelize.define('Person', {
    person_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(255), allowNull: false },
    surname: { type: DataTypes.STRING(255), allowNull: false },
    pnr: { type: DataTypes.STRING(255), allowNull: false, unique: true },
    email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
    password: { type: DataTypes.STRING(255), allowNull: true }, // Password initially can be null
    username: { type: DataTypes.STRING(255), allowNull: false, unique: true },
    role_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Role', key: 'role_id' } }
});

const Role = sequelize.define('Role', {
    role_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(255), allowNull: false }
});

Person.belongsTo(Role, { foreignKey: 'role_id' });

// Ensure passwords are always hashed before saving
Person.beforeCreate(async (user) => {
    if (!user.password) {
        throw new Error('Password is required');
    }
    user.password = await bcrypt.hash(user.password, 10);
});

Person.beforeUpdate(async (user) => {
    if (user.changed('password')) {
        user.password = await bcrypt.hash(user.password, 10);
    }
});

// Generate JWT Token for Authentication
Person.prototype.generateJWT = function () {
    return jwt.sign({ id: this.person_id, role: this.role_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

module.exports = { sequelize, Person, Role };
