const router = require('express').Router();
const session = require('express-session');
const { Users, Jobs, userInterests, Skills, userSkills, jobSkills } = require('../models');
const { Op } = require('sequelize');
const Sequelize = require('sequelize');
const { request } = require('express');



router.get('/', (req, res) => {

    console.log(req.session.user_id)

    if (req.session.type === "company") {
        Jobs.findAll({
            where: { company_id: req.session.user_id },
            include: { model: Skills, through: jobSkills,as: "skills" }

        }).then(data => {
            const companyId = req.session.user_id;
            const jobs = data.map(post => post.get({ plain: true }))
            console.log("ADADADADADMMMMMMM");
            console.log(jobs[0].skills);

            res.render('dashboard', {
                jobs,
                companyId,
                type: req.session.type,

            })
        })
    }
    else if (req.session.type === "seeker") {
        const seeker = req.session.user_id;
        Skills.findAll({})
            .then(dbUserData => {
                console.log(dbUserData);
                const skills = dbUserData.map(post => post.get({ plain: true }));
                console.log(skills);
                res.render('dashboard', {
                    skills,
                    loggedIn: req.session.loggedIn,
                    user_id: req.session.user_id,
                    full_name: req.session.full_name,
                    description: req.session.description,
                    type: req.session.type,
                    seeker

                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    }

})

router.put('/:id', (req, res) => {
    Users.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData[0]) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})

// router.put('/edit/:id', (req, res) => {
//     Jobs.update(req.body, {
//         individualHooks: true,
//         where: {
//             id: req.params.id
//         }
//     })
//         .then(dbJobData => {
//             if (!dbJobData[0]) {
//                 res.status(404).json({ message: 'No job found with this id' });
//                 return;
//             }
//             res.json(dbJobData);
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json(err);
//         });
// })

router.get('/:id', (req, res) => {
    Jobs.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {

            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            console.log(dbUserData.get({ plain: true }))
            const job = dbUserData.get({ plain: true })
            Skills.findAll({})
                .then(dbUserData2 => {
                    const skills = dbUserData2.map(post => post.get({ plain: true }));
                    console.log("this is skills");
                    console.log (skills);
                    res.render('edit-post', {
                        loggedIn: req.session.loggedIn,
                        job: job,
                        skills: skills,
                        type: req.session.type
                    })

                })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });


})


module.exports = router;
