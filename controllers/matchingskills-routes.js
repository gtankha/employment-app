const router = require('express').Router();
const session = require('express-session');
const { Users, Jobs, userInterests, Skills, userSkills, jobSkills } = require('../models');
const { Op } = require('sequelize');
const Sequelize = require('sequelize');

router.get('/', (req, res) => {

if (req.session.type === "company") {
    userSkills.findAll({
        attributes: ['user_id'],
        where: {
                skill_id: {
                [Op.in]:
                    [Sequelize.literal(`(SELECT skill_id FROM job_skills WHERE job_id IN (SELECT id from jobs WHERE company_id = ${req.session.user_id}))`)]
            }
        },
        include: [{
            model: Users,
               include: [
               {
                   model: Skills,
                   attributes:['name']
               }]
           },
          
       ]
    })
        .then(dbUserData => {
           const duplicateSkillUsers = dbUserData.map(post => post.get({ plain: true }));
           const matchingSkillUsers = Array.from(new Set(duplicateSkillUsers.map(a => a.user_id)))
           .map(user_id => {
             return duplicateSkillUsers.find(a => a.user_id === user_id)
           })

           res.render('test-skills', {
               matchingSkillUsers,
               loggedIn: req.session.loggedIn,
               type: req.session.type
           })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });

}

if (req.session.type === "seeker") {
    jobSkills.findAll({
        attributes: ['job_id'],
        where: {
            skill_id: {
                [Op.in]: [
                    Sequelize.literal(`SELECT skill_id FROM user_skills WHERE user_id = ${req.session.user_id}`)
                ]
            }
        },
        include: [{
         model: Jobs,
            include: [{
                model: Users,
                as: "company"
            },
            {
                model: Skills,
                attributes:['name']
                
            }]
        },
       
    ]
    
    })
        .then(dbUserData => {
         //   console.log(dbUserData);

            const duplicateSkillUsers = dbUserData.map(post => post.get({ plain: true }));
            const matchingSkillUsers = Array.from(new Set(duplicateSkillUsers.map(a => a.job_id)))
            .map(job_id => {
              return duplicateSkillUsers.find(a => a.job_id === job_id)
            });
            res.render('test-skills', {
                matchingSkillUsers,
                loggedIn: req.session.loggedIn,
                type: req.session.type
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });

}

});

module.exports = router;


