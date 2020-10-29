const Users = require("./Users");
const Jobs = require("./Jobs");
const Skills = require("./Skills")
const jobSkills = require("./Job-skills")
const userSkills = require("./User-skills")
const userInterests = require('./User-interests');

// create associations

// one to many
Users.hasMany(Jobs, {
    foreignKey: 'company_id'
  });

Jobs.belongsTo(Users, {
    foreignKey: 'company_id',
  });

// many to many

Users.belongsToMany(Jobs, {
    through: userInterests,
    as: 'users_interested',
    foreignKey: 'user_id'
  });
  
Jobs.belongsToMany(Users, {
    through: userInterests,
    as: 'user_interests',
    foreignKey: 'job_id'
  });

Jobs.belongsToMany(Skills, {
    through: jobSkills,
    as: "job_skills",
    foreignKey: "job_id"
})

Skills.belongsToMany(Jobs, {
    through: jobSkills,
    as: "skills_for_job",
    foreignKey: "skill_id"
})

Users.belongsToMany(Skills, {
    through: userSkills,
    as: "user_skills",
    foreignKey: "user_id"
})

Skills.belongsToMany(Users, {
    through: userSkills,
    as: "user_with_skill",
    foreignKey: "skill_id"
})

 


module.exports = { Users, Jobs, userInterests, Skills,jobSkills,userSkills };