const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Kind = sequelize.define('Kind', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name_english: { type: DataTypes.STRING, allowNull: true},
    name_persian: { type: DataTypes.STRING, allowNull: true},
    image: { type: DataTypes.STRING, allowNull: true},
    description: { type: DataTypes.TEXT, allowNull: true},
    image_path: {type: DataTypes.STRING, allowNull: true}
});


module.exports = Kind