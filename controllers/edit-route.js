const router = require('express').Router();
const session = require('express-session');
const { Users, Jobs, userInterests, Skills, userSkills, jobSkills } = require('../models');

router.put('/:id', (req, res) => {
    Jobs.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
        .then(dbJobData => {
            if (!dbJobData[0]) {
                res.status(404).json({ message: 'No job found with this id' });
                return;
            }
            res.json(dbJobData);
        })
        .catch(err => {
           
            res.status(500).json(err);
        });
})


module.exports = router;