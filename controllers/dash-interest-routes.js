const router = require('express').Router();
const { Users, Jobs, userInterests, Skills, userSkills, jobSkills } = require('../models');
const session = require('express-session');
const { Op } = require('sequelize');
const Sequelize = require('sequelize');


router.get('/', (req, res) => {
    const session_user_id = req.session.user_id;
    const session_type = req.session.type;

    if (session_type == "company") {

        Jobs.findAll(
            {
                where: { company_id: session_user_id },
                include: { model: userInterests, as: "job_interests", include: { model: Users, as: "candidates" } }
            })
            .then(interests => {
                userSkills.findAll({
                    attributes: ['user_id'],
                    where: {
                        skill_id: {
                            [Op.in]:
                                [Sequelize.literal(`(SELECT skill_id FROM job_skills WHERE job_id IN (SELECT id from JOBS WHERE company_id = ${req.session.user_id}))`)]
                        }
                    },
                    include: [{
                        model: Users,
                        include: [
                            {
                                model: Skills,
                                attributes: ['name']
                            }]
                    },

                    ]
                })
                    .then(dbUserData => {
                        const duplicateSkillUsers = dbUserData.map(post => post.get({ plain: true }));
                        let matchingSkillUsers = Array.from(new Set(duplicateSkillUsers.map(a => (a.user_id ))))
                            .map(user_id => {
                                return duplicateSkillUsers.find(a => (a.user_id === user_id ))
                            })   
                            matchingSkillUsers = matchingSkillUsers.filter(a => a.user_id != req.session.user_id );
                            console.log(matchingSkillUsers);
                        
                            res.render('dash-interests', { interests: interests, matchingSkillUsers: matchingSkillUsers, company: true, seeker: false, loggedIn: req.session.loggedIn, type:req.session.type,session:req.session });
                    })

                    .catch(err => console.log(err))

            })
    }


    else if (session_type == "seeker") {
        userInterests.findAll({ where: { user_id: session_user_id }, include: { model: Jobs, as: "interested_in", include: { model: Users, as: "company" } } })
            .then(interests => {

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
                            attributes: ['name']

                        }]
                    }],

                })
                    .then(dbUserData => {
                        //   console.log(dbUserData);

                        const duplicateSkillUsers = dbUserData.map(post => post.get({ plain: true }));
                        const matchingSkillUsers = Array.from(new Set(duplicateSkillUsers.map(a => a.job_id)))
                            .map(job_id => {
                                return duplicateSkillUsers.find(a => a.job_id === job_id)
                            });


                        res.render('dash-interests', { interests: interests, matchingSkillUsers: matchingSkillUsers, company: false, seeker: true, loggedIn: req.session.loggedIn, type: req.session.type,session:req.session });

                    })
                    .catch(err => console.log(err))

            })

    }
})

    module.exports = router;