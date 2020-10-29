const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class jobSkills extends Model {}

jobSkills.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
  
    skill_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'skill',
        key: 'id'
      }
    },
    job_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'job',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'job_skills',
  }
);

module.exports = jobSkills;
