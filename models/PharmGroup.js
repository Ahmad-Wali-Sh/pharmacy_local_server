const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


const PharmGroup = sequelize.define('PharmGroup', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name_english: {type: DataTypes.STRING, allowNull: true},
    name_persian: {type: DataTypes.STRING, allowNull: true},
    image: {type: DataTypes.STRING, allowNull: true},
    description: {type: DataTypes.STRING, allowNull: true},
  });


module.exports = PharmGroup