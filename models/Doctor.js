const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


const Doctor = sequelize.define('Doctor', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    code: {type: DataTypes.INTEGER, allowNull: true},
    last_name: {type: DataTypes.STRING, allowNull: true},
    expertise: {type: DataTypes.STRING, allowNull: true},
    contact_number: {type: DataTypes.INTEGER, allowNull: true},
    email: {type: DataTypes.STRING, allowNull: true},
    workplace: {type: DataTypes.STRING, allowNull: true},
    work_time: {type: DataTypes.STRING, allowNull: true},
    home_address: {type: DataTypes.STRING, allowNull: true},
    description: {type: DataTypes.TEXT, allowNull: true},
  });

module.exports = Doctor