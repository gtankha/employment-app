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
                        include:{model:Users,as:"company"}
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