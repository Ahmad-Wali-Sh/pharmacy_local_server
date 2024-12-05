const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const MedicineWith = sequelize.define("MedicineWith", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  medicine: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: "medicine", key: "id" },
  },
  additional: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: "medicine", key: "id" },
  },
});

module.exports = MedicineWith;
