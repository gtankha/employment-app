const router = require('express').Router();
const { Users, Jobs, userInterests, Skills, userSkills, jobSkills } = require('../models');
const session = require('express-session');


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



                res.render('dash-interests', { interests: interests, company:true,seeker:false ,session:req.session });
            })

            .catch(err => console.log(err))

    }

    else if (session_type == "seeker") {
        userInterests.findAll({ where: { user_id: session_user_id }, include: { model: Jobs, as: "interested_in", include: { model: Users, as: "company" } } })
            .then(interests => {

                res.render('dash-interests', { interests: interests, company:false,seeker:true,session:req.session });

            })
            .catch(err => console.log(err))

    }
})

module.exports = router;