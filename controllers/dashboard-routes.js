const router = require('express').Router();
const session = require('express-session');
const { Users, Jobs, userInterests, Skills, userSkills, jobSkills } = require('../models');
const { Op } = require('sequelize');
const Sequelize = require('sequelize');
const { request } = require('express');



router.get('/', (req, res) => {

   

    if (req.session.type === "company") {
        Jobs.findAll({
            where: { company_id: req.session.user_id },
            include: { model: Skills, through: jobSkills,as: "skills" }

        }).then(data => {
            const companyId = req.session.user_id;
            const jobs = data.map(post => post.get({ plain: true }))
          

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
            
                const skills = dbUserData.map(post => post.get({ plain: true }));
           
                Users.findAll({
                    where: { id: req.session.user_id },
                    include: { model: Skills, through: userSkills,as: "skills" }
                })
                .then (dbUserData2 =>{
                    const userskills = dbUserData2.map(post => post.get({ plain: true }));
                
                res.render('dashboard', {
                    skills,
                    userskills,
                    loggedIn: req.session.loggedIn,
                    user_id: req.session.user_id,
                    full_name: req.session.full_name,
                    description: req.session.description,
                    type: req.session.type,
                    seeker

                });
            })
            .catch(err => {
               
                res.status(500).json(err);
            });
    })
}

})

router.put('/:id', (req, res) => {
    
    Users.update(req.body,

        { where: { id: req.params.id } }

    )
        .then(result => {

            Users.findOne({
                where: {
                    id: req.params.id
                }
            }
            )
                .then(updatedUser => {
                  
                    req.session.description = updatedUser.description;

                  return res.json(updatedUser);

                })
        })

        .catch((err) => {

            res.status(400).json(err);
        });
});



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
         
            const job = dbUserData.get({ plain: true })
            Skills.findAll({})
                .then(dbUserData2 => {
                    const skills = dbUserData2.map(post => post.get({ plain: true }));
                  
                   
                    res.render('edit-post', {
                        loggedIn: req.session.loggedIn,
                        job: job,
                        skills: skills,
                        type: req.session.type
                    })

                })
        })
        .catch(err => {
            
            res.status(500).json(err);
        });


})


module.exports = router;
