const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Patient = sequelize.define('Patient', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    code: {type: DataTypes.INTEGER, allowNull: true},
    last_name: {type: DataTypes.STRING, allowNull: true},
    gender: {type: DataTypes.STRING, allowNull: true},
    birth_date: {type: DataTypes.DATE, allowNull: true},
    tazkira_number: {type: DataTypes.INTEGER, allowNull: true},
    contact_number: {type: DataTypes.INTEGER, allowNull: true},
    address: {type: DataTypes.STRING, allowNull: true},
    sickness: {type: DataTypes.STRING, allowNull: true},
    description: {type: DataTypes.TEXT, allowNull: true},
  });


module.exports = Patient