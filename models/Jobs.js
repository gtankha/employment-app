const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Jobs extends Model {}

Jobs.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    company_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
      }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'jobs',
  }
);

module.exports = Jobs;