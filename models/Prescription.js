const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const PrescriptionThrough = require('./PrescriptionThrough')
const Doctor = require('./Doctor')
const Patient = require('./Patient')
const Department = require('./Department')
const User = require('./User')


const Prescription = sequelize.define('Prescription', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    department_id: { type: DataTypes.INTEGER, allowNull: false }, // ForeignKey
    prescription_number: { type: DataTypes.STRING, unique: true },
    name_id: { type: DataTypes.INTEGER, allowNull: true }, // ForeignKey
    doctor_id: { type: DataTypes.INTEGER, allowNull: true }, // ForeignKey
    grand_total: { type: DataTypes.FLOAT, defaultValue: 0 },
    discount_money: { type: DataTypes.FLOAT, defaultValue: 0 },
    discount_percent: { type: DataTypes.FLOAT, defaultValue: 0 },
    over_money: { type: DataTypes.FLOAT, defaultValue: 0 },
    over_percent: { type: DataTypes.FLOAT, defaultValue: 0 },
    zakat: { type: DataTypes.FLOAT, defaultValue: 0 },
    khairat: { type: DataTypes.FLOAT, defaultValue: 0 },
    rounded_number: { type: DataTypes.FLOAT, defaultValue: 0 },
    sold: { type: DataTypes.BOOLEAN, defaultValue: false },
    refund: { type: DataTypes.FLOAT, defaultValue: 0 },
    purchase_payment_date: { type: DataTypes.DATE, allowNull: true },
    purchased_value: { type: DataTypes.FLOAT, defaultValue: 0 },
    user_id: { type: DataTypes.INTEGER, allowNull: false }, 
    timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  }, {
    tableName: 'prescription',
    timestamps: false,
  });

  
Prescription.belongsTo(User, { foreignKey: 'user_id', as: 'user'})  
Prescription.belongsTo(Patient, { foreignKey: 'name_id', as: 'patient' }); 
Prescription.belongsTo(Doctor, { foreignKey: 'doctor_id', as: 'doctor' }); 
Prescription.belongsTo(Department, { foreignKey: 'department_id', as: 'department' }); 
PrescriptionThrough.belongsTo(Prescription, { foreignKey: 'prescription_id', as: 'item' });
PrescriptionThrough.belongsTo(User, { foreignKey: 'user_id' });
  
Prescription.hasMany(PrescriptionThrough, { foreignKey: 'prescription_id', as: 'items' });
Patient.hasMany(Prescription, { foreignKey: 'name_id', as: 'prescriptions' }); 
Doctor.hasMany(Prescription, { foreignKey: 'doctor_id', as: 'prescriptions' }); 
Department.hasMany(Prescription, { foreignKey: 'department_id', as: 'prescriptions' }); 

module.exports = Prescription;