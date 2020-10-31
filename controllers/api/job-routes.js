const router = require('express').Router();
const { Users, Jobs, userInterests } = require('../../models');

// GET all Jobs
router.get('/', (req, res) => {

    Jobs.findAll(
       { exclude: ['password']
        , include: [{
              model: Users,
              attributes: ['id', 'description', 'company_name']
            }] 
        
        })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            res.status(500).json(err);
        });

});

// GET single job
router.get('/:id', (req, res) => {
    Jobs.findOne({
    
        include: 
          [{
            model: Users,
            attributes: ['id', 'description', 'company_name']
          }]
        ,
        where:{id:req.params.id}
        
      
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

// create new job
router.post('/', (req, res) => {



    Jobs.create({
        title: req.body.title,
        description: req.body.description,
        company_id: req.body.company_id

    })
        .then(dbUserData => {

            res.json(dbUserData);
        })

        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });

})

// update job
router.put('/:id', (req, res) => {
    // update job data
  
  
    //make sure there are actual pertinent fields
  
    if (!req.body.interestIds || !req.body.interestIds.length) {
  
    Jobs.update(req.body,
      
      {  where: { id: req.params.id }}
      
    )
    .then(result => {
    
      Jobs.findOne({
        where: {
          id: req.params.id
        }}
      )
      .then(updatedJob => res.json(updatedJob));
      
    
    })
  
    .catch((err) => {
       
      res.status(400).json(err);
    });
  
   
    }
  
  
    userInterests.findAll({ where: { job_id: req.params.id ,type:"employer"} })
      .then(interests => {
        // get list of current interest_ids
  
        const interestsIds = interests.map(({ interest_id }) => interest_id);
     console.log(interestsIds);
      
        // create filtered list of new interests
        const newInterests = req.body.interestIds
          .filter((interest_id) => !interestsIds.includes(interest_id))
          .map((interest_id) => {
            return {
              job_id: req.params.id,
              user_id: interest_id,
              type:"employer"
              
            };
          });
         console.log(newInterests);
       
        // figure out which ones to remove
        const interestsToRemove = interests
          .filter(({ interest_id }) => !req.body.interestIds.includes(interest_id))
          .map(({ id }) => id);
  
          console.log(interestsToRemove);
  
        // run both actions
        return Promise.all([
          userInterests.destroy({ where: { id: interestsToRemove } }),
          userInterests.bulkCreate(newInterests),
        ]);
      })
      .then((updatedInterests) => { 
        
        res.json(updatedInterests[1])
      })
      .catch((err) => {
       
        res.status(400).json(err);
        console.log(err);
      });
  });


  router.delete('/:id', (req, res) => {

    Jobs.destroy({where:{id:req.params.id}})
    .then(result => res.status(200).json(result))
    .catch((err) => res.status(400).json(err))
    
  })

module.exports = router;



