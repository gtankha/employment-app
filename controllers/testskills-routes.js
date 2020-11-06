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
                    [Sequelize.literal(`(SELECT skill_id FROM job_skills WHERE job_id IN (SELECT id from JOBS WHERE company_id = ${req.session.user_id}))`)]
            }
        }
    })
        .then(dbUserData => {
           // console.log(dbUserData.job_skills);
           const duplicateSkillUsers = dbUserData.map(post => post.get({ plain: true }));
           console.log(duplicateSkillUsers);
           console.log (req.session);
           const matchingSkillUsers = duplicateSkillUsers.filter((value, index)=> 
           {
             console.log (value.user_id);
             console.log ("index: "+ index);
             console.log (duplicateSkillUsers.findIndex(value => value.user_id));
             console.log (duplicateSkillUsers.findIndex(value => value.user_id) == index);
             return duplicateSkillUsers.findIndex(value => value.user_id) === index;
           }
           );

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
            }]
        },
        {
        model: Skills
    
        }
    ]
    
    })
        .then(dbUserData => {
         //   console.log(dbUserData);

            const duplicateSkillUsers = dbUserData.map(post => post.get({ plain: true }));
            console.log(duplicateSkillUsers);
            console.log (req.session);
            const matchingSkillUsers = duplicateSkillUsers.filter((value, index)=> 
            {
              console.log (value);
              return duplicateSkillUsers.findIndex(value => value.job_id) === index;

            }
            );

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

    // Jobs.findAll({
    //     include:
    //         [{
    //             model: Users,
    //             attributes: ['id', 'description', 'company_name']
    //         },
    //         {
    //             model: Skills,
    //             attributes: ['name'],
    //             through: jobSkills
    //         }
    //         ],
    //     where: { company_id: req.session.id }

    // }).then(jobs=>{
    //     console.log(jobs)
    // })
