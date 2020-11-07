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
    }

   })

module.exports = router;
    
