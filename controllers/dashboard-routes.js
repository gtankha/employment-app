const router = require('express').Router();
const session = require('express-session');
const { Users, Jobs, userInterests, Skills, userSkills, jobSkills } = require('../models');


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
})

module.exports = router;