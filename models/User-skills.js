const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class userSkills extends Model {}

userSkills.init(
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
        model: 'skills',
        key: 'id'
      }
    },
    user_id: {
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
    modelName: 'user_skills',
  }
);

module.exports = userSkills;
