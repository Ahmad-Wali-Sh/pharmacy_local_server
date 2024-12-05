const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const BigCompany = sequelize.define('BigCompany', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false},
});


module.exports = BigCompany