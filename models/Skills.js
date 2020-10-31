const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Skills extends Model {}

Skills.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'skills',
  }
);

module.exports = Skills;