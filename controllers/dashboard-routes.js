const router = require('express').Router();
const session = require('express-session');
const { Users, Jobs, userInterests, Skills, userSkills, jobSkills } = require('../models');
const { Op } = require('sequelize');
const Sequelize = require('sequelize');



router.get('/', (req, res) => {

    console.log(req.session.user_id)

    if(req.session.type === "company"){
        Jobs.findAll({
            where: {company_id: req.session.user_id}
        }).then(data=>{
            const companyId = req.session.user_id;
            const jobs = data.map(post => post.get({ plain: true }))
            res.render('dashboard',{
                jobs,
                companyId
            })
        })
    }else if(req.session.type === "seeker"){
        const seeker = req.session.user_id;
        res.render('dashboard', {
            seeker,
            loggedIn: req.session.loggedIn,
        })
    }

   })

router.put('/:id', (req,res) => {
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
        const job  = dbUserData.get({ plain: true })

        res.render('edit-post', {
            loggedIn: req.session.loggedIn,
            job: job

        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
    

})


module.exports = router;
