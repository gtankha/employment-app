const router = require('express').Router();
const session = require('express-session');
const { Users, Jobs, userInterests, Skills, userSkills, jobSkills } = require('../models');
const { Op } = require('sequelize');
const Sequelize = require('sequelize');

router.get('/', (req, res) => {

//if (req.session.type === "company") {
    userSkills.findAll({
        attributes: ['user_id'],
        where: {
                skill_id: {
                [Op.in]:
                    [Sequelize.literal(`(SELECT skill_id FROM job_skills WHERE job_id IN (SELECT id from jobs WHERE company_id = ${req.params.id}))`)]
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

            res.status(200).json(dbUserData)
           const duplicateSkillUsers = dbUserData.map(post => post.get({ plain: true }));
           const matchingSkillUsers = Array.from(new Set(duplicateSkillUsers.map(a => a.user_id)))
           .map(user_id => {
             return duplicateSkillUsers.find(a => a.user_id === user_id)
           })

        //    res.render('test-skills', {
        //        matchingSkillUsers,
        //        loggedIn: req.session.loggedIn,
        //        type: req.session.type
        //    })
        })
        .catch(err => {
       
            res.status(500).json(err);
        });

});

module.exports = router;


