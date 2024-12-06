const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Kind = require('./Kind')
const PharmGroup = require('./PharmGroup')
const MedicineBarcode = require('./MedicineBarcode')
const MedicineWith = require('./MedicineWith')
const Country = require('./Country');
const BigCompany = require('./BigCompany');
const Department = require('./Department');

const Medicine = sequelize.define('Medicine', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  medicine_full: {type: DataTypes.STRING, allowNull: true},
  brand_name: { type: DataTypes.STRING, allowNull: false },
  generic_name: { type: DataTypes.STRING, allowNull: true },
  barcode: { type: DataTypes.JSON, defaultValue: [] },
  no_pocket: { type: DataTypes.FLOAT, allowNull: true },
  no_box: { type: DataTypes.FLOAT, defaultValue: 1 },
  pharm_group: { type: DataTypes.INTEGER, allowNull: true },
  kind: { type: DataTypes.INTEGER, allowNull: true }, 
  ml: { type: DataTypes.STRING, allowNull: true },
  unit: { type: DataTypes.INTEGER, allowNull: true }, 
  weight: { type: DataTypes.STRING, allowNull: true },
  location: { type: DataTypes.STRING, allowNull: true },
  country: { type: DataTypes.INTEGER, allowNull: true },
  company: { type: DataTypes.STRING, allowNull: true },
  price: { type: DataTypes.FLOAT, allowNull: false },
  existence: { type: DataTypes.FLOAT, defaultValue: 0 },
  minmum_existence: { type: DataTypes.FLOAT, defaultValue: 0 },
  maximum_existence: { type: DataTypes.FLOAT, defaultValue: 0 },
  must_advised: { type: DataTypes.BOOLEAN, defaultValue: false },
  dividing_rules: { type: DataTypes.TEXT, allowNull: true },
  cautions: { type: DataTypes.TEXT, allowNull: true },
  usages: { type: DataTypes.TEXT, allowNull: true },
  description: { type: DataTypes.TEXT, allowNull: true },
  image: {type: DataTypes.STRING, allowNull: true},
  patient_approved: { type: DataTypes.BOOLEAN, defaultValue: false },
  doctor_approved: { type: DataTypes.BOOLEAN, defaultValue: false },
  active: { type: DataTypes.BOOLEAN, defaultValue: true },
  department: { type: DataTypes.JSON, defaultValue: [] },
  min_expire_date: { type: DataTypes.INTEGER, defaultValue: 6 },
  big_company: { type: DataTypes.INTEGER, allowNull: true },
  image_path: {type: DataTypes.STRING, allowNull: true},
}, {
  tableName: 'medicine',
  timestamps: false,
});

Medicine.belongsTo(Kind, { foreignKey: 'kind' });
Medicine.belongsTo(PharmGroup, { foreignKey: 'pharm_group' });
Medicine.belongsTo(Country, { foreignKey: 'country' });
Medicine.belongsTo(BigCompany, { foreignKey: 'big_company' });
Medicine.hasMany(MedicineBarcode, { foreignKey: 'medicine', as: 'barcodes' });
MedicineBarcode.belongsTo(Medicine, { foreignKey: 'medicine'});

Medicine.belongsToMany(Medicine, {
  through: MedicineWith,
  as: 'PairedMedicines',
  foreignKey: 'medicine',
  otherKey: 'additional'
})
Medicine.hasMany(Department, { foreignKey: 'department_id', as: 'departments' });

module.exports = Medicine;