const router = require('express').Router();
const { Users, Jobs, userInterests } = require('../../models');
const models = require('../../models');

router.get('/', (req, res) => {



    if (req.query.user_id) {

       

            userInterests.findAll(
                {
                    attributes: { exclude: ['id', 'userId'] },
                    where: { user_id: req.query.user_id },

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
        else if (req.query.company_id) {

            Jobs.findAll({
                where: { company_id: req.query.company_id },
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
    else {
        userInterests.findAll()
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                res.status(500).json(err);
            });

    }

});

// DELETE single interest
router.delete('/:id', (req, res) => {
    userInterests.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});



module.exports = router;