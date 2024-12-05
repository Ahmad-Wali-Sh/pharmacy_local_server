const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


const Department = sequelize.define('Department', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: {type: DataTypes.STRING, allowNull: false},
    over_price_money: { type: DataTypes.FLOAT, allowNull: true},
    over_price_percent: { type: DataTypes.FLOAT, allowNull: true},
    discount_money: { type: DataTypes.FLOAT, allowNull: true},
    discount_percent: { type: DataTypes.FLOAT, allowNull: true},
    celling_start: { type: DataTypes.FLOAT, allowNull: true},
  });

module.exports = Department