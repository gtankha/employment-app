const Users = require("./Users");
const Jobs = require("./Jobs");
const Skills = require("./Skills")
const jobSkills = require("./Job-skills")
const userSkills = require("./User-skills")
const userInterests = require('./User-interests');

// create associations

// one to many
Users.hasMany(Jobs, {
    as:"company",
    foreignKey: 'company_id'
  });

Jobs.belongsTo(Users, {
    as:"company",
    foreignKey: 'company_id',
  });

Jobs.hasMany(userInterests,{
    foreign_key:"job_id",
    as:"job_interests"
})

userInterests.belongsTo(Jobs,{
    foreignKey: "job_id",
    as:"interested_in"
})

Users.hasMany(userInterests,{
    foreign_key:"user_id",
    as:"users_int"
})

userInterests.belongsTo(Users,{
    foreignKey: "user_id",
    as:"int_users"
})

// many to many

Users.belongsToMany(Jobs, {
    through: userInterests,
    foreignKey: 'user_id'
  });
  
Jobs.belongsToMany(Users, {
    through: userInterests,
    foreignKey: 'job_id'
  });

Jobs.belongsToMany(Skills, {
    through: jobSkills,
    foreignKey: "job_id"
})

Skills.belongsToMany(Jobs, {
    through: jobSkills,

    foreignKey: "skill_id"
})

Users.belongsToMany(Skills, {
    through: userSkills,
    foreignKey: "user_id"
})

Skills.belongsToMany(Users, {
    through: userSkills,
    foreignKey: "skill_id"
})

 


module.exports = { Users, Jobs, userInterests, Skills,jobSkills,userSkills };