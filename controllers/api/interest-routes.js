const router = require('express').Router();
const { Users, Jobs, userInterests } = require('../../models');
const models = require('../../models');

router.get('/', (req, res) => {



    if (req.body.id && req.body.type) {

        if (req.body.type == "seeker") {

            userInterests.findAll(
                { 
                    attributes:{exclude:['id']},
                    where: { user_id: req.body.id },

                    include:{
                        model:Jobs,
                        as:"interested_in",
                        include:{model:Users,as:"company",attributes:{exclude:['password']}}
                    } 
            
                })
                .then(dbUserData => res.json(dbUserData))
                .catch(err => {
                    res.status(500).json(err);
                    console.log(err);
                });
        }
        else if(req.body.type == "employer"){

            Jobs.findAll({
                where:{company_id:req.body.id},
                include: {
                    model:userInterests,
                    as:"job_interests",
                    include:{model:Users,as:'candidates',attributes:{exclude:['password']}}
                
                }
            })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                res.status(500).json(err);
                console.log(err);
            });

        }


    }
    else {
        userInterests.findAll()
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                res.status(500).json(err);
            });

    }

});

module.exports = router;