const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


const PrescriptionThrough = sequelize.define('PrescriptionThrough', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    medician_id: { type: DataTypes.INTEGER, allowNull: false }, 
    prescription_id: { type: DataTypes.INTEGER, allowNull: false }, 
    quantity: { type: DataTypes.FLOAT, defaultValue: 1 },
    each_price: { type: DataTypes.FLOAT, defaultValue: 0 },
    total_price: { type: DataTypes.FLOAT, defaultValue: 0 },
    user_id: { type: DataTypes.INTEGER, allowNull: false }, 
    timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  }, {
    tableName: 'prescription_through',
    timestamps: false,
  });


module.exports = PrescriptionThrough