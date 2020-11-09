const router = require('express').Router();
const { Users, Jobs, userInterests } = require('../../models');
const models = require('../../models');

router.get('/', (req, res) => {

       

            userInterests.findAll(
                {
                    attributes: { exclude: ['userId'] },
                    

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
        
       
   

});

// update single interest
router.put('/:id', (req, res) => {
userInterests.update(req.body,

    { where: { id: req.params.id } }

)
    .then(result => {

        userInterests.findOne({
            where: {
                id: req.params.id
            }
        }
        )
            .then(updatedUser => res.json(updatedUser));
    })

    .catch((err) => {

        res.status(400).json(err);
    });
})

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