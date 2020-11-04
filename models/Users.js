const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

// create our User model
class Users extends Model { 
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
      }

}

Users.init(
    {
    
        id: {
        
            type: DataTypes.INTEGER,
         
            allowNull: false,
           
            primaryKey: true,
         
            autoIncrement: true
        },
    
        full_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        company_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
     
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            
            unique: true,
           
            validate: {
                isEmail: true
            }
        },
       
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              
                len: [8]
            }
        },
        type: {
            type: DataTypes.STRING,
            allowNull:false  

        }

    },
    {
   
        hooks: {
            // set up beforeCreate lifecycle "hook" functionality
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },

            // set up beforeUpdate lifecycle "hook" functionality
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            }
        },
        // pass in our imported sequelize connection (the direct connection to our database)
        sequelize,
        
        timestamps: false,
        // don't pluralize name of database table
        freezeTableName: true,
        // use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
        underscored: true,
        // make it so our model name stays lowercase in the database
        modelName: 'users'
    }
);

module.exports = Users;