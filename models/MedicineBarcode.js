const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const MedicineBarcode = sequelize.define('MedicineBarcode', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  barcode: { type: DataTypes.STRING, unique: true },
  medicine: { 
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'medicine', key: 'id' },
  },
}, {
  tableName: 'medicine_barcode',
  timestamps: false,
});

module.exports = MedicineBarcode;