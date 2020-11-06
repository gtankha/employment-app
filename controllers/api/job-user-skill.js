const router = require('express').Router();
const { Op } = require('sequelize');
const { QueryTypes } = require('sequelize');
const { userSkills, jobSkills, Users, Jobs } = require('../../models');
const Sequelize = require('sequelize');

router.get('/seeker/:id', (req, res) => {

    jobSkills.findAll({
        attributes: ['job_id'],
        where: {
            skill_id: {
                [Op.in]: [
                    Sequelize.literal(`SELECT skill_id FROM user_skills WHERE user_id = ${req.params.id}`)
                ]
            }
        }
    })
        .then(dbUserData => {
            console.log(dbUserData);
            res.json(dbUserData)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });

});



router.get('/company/:id', (req, res) => {

    userSkills.findAll({
        attributes: ['user_id'],
        where: {
            skill_id: {
                [Op.in]:
                [Sequelize.literal(`(SELECT skill_id FROM job_skills WHERE job_id IN (SELECT id from JOBS WHERE company_id = ${req.params.id}))`)]
            }
        }
    })
        .then(dbUserData => {
            console.log(dbUserData);
            res.json(dbUserData)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });

});

module.exports = router;