const router = require('express').Router();
const session = require('express-session');
const { Users, Jobs, userInterests, Skills, userSkills, jobSkills } = require('../models');
const { Op } = require('sequelize');
const Sequelize = require('sequelize');


router.get('/', (req, res) => {
    Skills.findAll({
    })
        .then(dbUserData => {
            console.log(dbUserData);
            const skills = dbUserData.map(post => post.get({ plain: true }));
            console.log(skills);
            res.render('test2-skills', {
                skills,
                loggedIn: req.session.loggedIn,
                user_id: req.session.user_id,
                type: req.session.type,
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });


});

module.exports = router;
