const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class userInterests extends Model {}

userInterests.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
  
    job_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'jobs',
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    type: {
      type: DataTypes.STRING
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user_interests',
  }
);

module.exports = userInterests;