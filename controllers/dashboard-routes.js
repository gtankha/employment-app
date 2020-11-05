const router = require('express').Router();
const { Users, Jobs, userInterests, Skills, userSkills, jobSkills } = require('../models');


router.get('/', (req, res) => {
   const session_user_id = req.session.user_id;
   const session_type = req.session.type;

   if(session_type == "employer")
   {

    Jobs.findAll(
        { where:{company_id:session_user_id},
          include:{model:userInterests, as:"job_interests",include:{model:Users,as:"candidates"}} 
    })
    .then(interests => {

       
        console.log(interests)
       res.render('dashboard', {interests:interests,type:session_type});
    })

    .catch(err => console.log(err))
    
    }
    
   else if(session_type == "seeker")
  {
   userInterests.findAll({where:{user_id:session_user_id}})
   .then(interests => {

    const seekerInterest = interests.filter(interest => interest.type = "seeker");
    const employerInterest = interests.filter(interest => interest.type = "employer");
    const interview = interests.filter(interest => interest.type = "interview");

    console.log(interests)

    console.log(seekerInterest);
    console.log(employerInterest);
    console.log(interview);

   })
    res.render('dashboard', {});
}
})

module.exports = router;