const router = require('express').Router();
const { Users, Jobs, userInterests, Skills, userSkills, jobSkills } = require('../models');

// GET all users
router.get('/', (req, res) => {

    console.log(req.query);

    if (req.query.type == "seeker") {
        Users.findAll({
            attributes: { exclude: ['password'] },
            where: {
                type: req.query.type
            },
            include: [
                {
                    model: Skills,
                    attributes: ['name'],
                    through: userSkills
                },
                {
                    model: userInterests,
                    attributes: ['id', 'job_id', 'type'],
                    as: "interested_in",
                    include: { model: Jobs, as: "interested_in", attributes: { exclude: ['password', 'id'] } }
                },
            ]
        })
            .then(dbUserData => {
                console.log(dbUserData);
                res.json(dbUserData)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    } else {
        Users.findAll({
            attributes: { exclude: ['password'] },
            where: {
                type: "seeker"
            },
            include: [{
                model: Jobs,
                attributes: ["id", "title", "company_id"],
                include: [
                    {
                        model: Skills,
                        attributes: ['name'],
                        through: jobSkills
                    },
                    {
                        model: userInterests,
                        as: "parties_interested",
                        attributes: ['user_id', 'type']
                        //  include: { model: Users,  attributes: ['full_name'] }   
                    }]
            }]
        })
            .then(dbUserData => {
                console.log(dbUserData);
                const users = dbUserData.map(post => post.get({ plain: true }));
                console.log(users)
                res.render('homepage', {
                    users,
                    loggedIn: req.session.loggedIn
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    }


    // if (req.query.type == "employer") {
    //     Users.findAll({
    //         attributes: { exclude: ['password'] },
    //         where: {
    //             type: req.query.type
    //         },
    //         include: [{
    //             model: Jobs,
    //             attributes: ["id", "title", "company_id"],
    //             include: [
    //                 {
    //                     model: Skills,
    //                     attributes: ['name'],
    //                     through: jobSkills
    //                 },
    //                 {
    //                     model: userInterests,
    //                     as: "parties_interested",
    //                     attributes: ['user_id', 'type']
    //                     //  include: { model: Users,  attributes: ['full_name'] }   
    //                 }]
    //         }]
    //     })
    //         .then(dbUserData => {
    //             console.log(dbUserData);
    //             res.json(dbUserData)
    //         })
    //         .catch(err => {
    //             console.log(err);
    //             res.status(500).json(err);
    //         });
    // }









});


//login
router.get('/login', (req, res) => {
    res.render('login');
});

module.exports = router;