const router = require('express').Router();
const { Skills,Users,userSkills,jobSkills, Jobs} = require("../../models");
// const userSkills = require('../../models/User-skills');
// const Users = require('../../models/Users');

// GET /api/users
router.get('/', (req, res) => {


    Skills.findAll({
        include: [
            {
            
         model: Users,
         attributes: ['full_name','company_name','description','email','type'],
         through: userSkills
        // as: 'user_skills'
            },
            {
          model: Jobs,
          attributes: ['title','description','company_id'],
          through: jobSkills
        //  as: 'job_skills'     
            }
        ]
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
        
            res.status(500).json(err);
        });

});


router.get('/:id', (req, res) => {
    Skills.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
            
         model: Users,
         attributes: ['full_name','company_name','description','email','type'],
         through: userSkills
     //    as: 'user_skills'
            },
            {
          model: Jobs,
          attributes: ['title','description','company_id'],
          through: jobSkills
       //   as: 'job_skills'     
            }
        ]
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No skill found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
   
            res.status(500).json(err);
        });

});

// POST /api/users
router.post('/', (req, res) => {
  
    Skills.create({
        name: req.body.name,
    })
        .then(dbUserData => {
            res.status(200).json(dbUserData);
          
        })
        .catch(err => {
        
            res.status(500).json(err);
        });
});

// PUT /api/users/1
router.put('/:id', (req, res) => {


    // if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
    Skills.update(
        {
            name: req.body.name,
        }
        , {
            where: {
                id: req.params.id
            }
        })
        .then(dbUserData => {
            if (!dbUserData[0]) {
                res.status(404).json({ message: 'No skill found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
         
            res.status(500).json(err);
        });


});

// DELETE /api/users/1
router.delete('/:id', (req, res) => {

  Skills.destroy({
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
          
            res.status(500).json(err);
        });
});

module.exports = router;
