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
            seeker
        })
    }

   })

router.put('/:id', (req,res) => {
    console.log('yeeeouch')
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


module.exports = router;
