const router = require('express').Router();
const { Users, Jobs, userInterests } = require('../../models');
const models = require('../../models');

router.get('/', (req, res) => {



    if (req.query.id && req.query.type) {

        if (req.query.type == "seeker") {

            userInterests.findAll(
                {
                    attributes: { exclude: ['id', 'userId'] },
                    where: { user_id: req.query.id, type: req.query.type },

                    include: {
                        model: Jobs,
                        as: "interested_in",
                        include: { model: Users, as: "company", attributes: { exclude: ['password'] } }
                    }

                })
                .then(dbUserData => res.json(dbUserData))
                .catch(err => {
                    res.status(500).json(err);
                    console.log(err);
                });
        }
        else if (req.query.type == "employer") {

            Jobs.findAll({
                where: { company_id: req.query.id },
                include: {
                    model: userInterests,
                    as: "job_interests",
                    include: { model: Users, as: 'candidates', attributes: { exclude: ['password'] } }

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