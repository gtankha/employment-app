const router = require('express').Router();
const { Users, Jobs, userInterests } = require('../../models');
const models = require('../../models');

router.get('/', (req, res) => {



  

       

            userInterests.findAll(
                {
                    attributes: { exclude: ['id', 'userId'] },
                    

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