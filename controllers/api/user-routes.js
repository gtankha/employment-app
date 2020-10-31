const router = require('express').Router();
const { Users, Jobs, userInterests } = require('../../models');

// GET all users
router.get('/', (req, res) => {
    
   
    Users.findAll({attributes: { exclude: ['password'] }})
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        res.status(500).json(err);
      });
  });


//destroy login session
router.post('/logout', (req, res) => {

  

  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  }
  else {
    res.status(404).end();
  }

});



// GET single user
router.get('/:id', (req, res) => {
    Users.findOne( {
      exclude: ['password']     
        ,
      where: {
        id: req.params.id
      }})
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

// create new user
router.post('/', (req, res) => {


  
    Users.create({
      full_name: req.body.full_name,
      company_name: req.body.company_name,
      email: req.body.email,
      password: req.body.password,
      description: req.body.description,
      type: req.body.type,
    })
      .then(dbUserData => { 
        
        req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.full_name = dbUserData.full_name,
        req.session.type = dbUserData.type,
        req.session.company_name = dbUserData.company_name,
        req.session.loggedIn = true;
    
        res.json(dbUserData);
      });
    
    })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.post('/login', (req, res) => {

    // Query operation

  Users.findOne({
    where: {
      email: req.body.email
    }
  }).then(dbUserData => {
    if (!dbUserData) {
      res.status(400).json({ message: 'No user with that email address!' });
      return;
    }

 

    // Verify user

    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
        res.status(400).json({ message: 'Incorrect password!' });
        return;
      }
      
      req.session.save(() => {
        // declare session variables
        req.session.user_id = dbUserData.id;
        req.session.full_name = dbUserData.full_name,
        req.session.type = dbUserData.type,
        req.session.company_name = dbUserData.company_name,
        req.session.loggedIn = true;
        
    
        res.json({ user: dbUserData, message: 'You are now logged in!' });
      });
    

  });  
  
  })
  

// update user
// update user interests
router.put('/:id', (req, res) => {
    // update job data
  
  
    //make sure there are actual pertinent fields
  
    if (!req.body.interestIds || !req.body.interestIds.length) {
  
    Users.update(req.body,
      
      {  where: { id: req.params.id }}
      
    )
    .then(result => {
    
      Users.findOne({
        where: {
          id: req.params.id
        }}
      )
      .then(updatedUser => res.json(updatedUser));
      
    
    })
  
    .catch((err) => {
       
      res.status(400).json(err);
    });
  
   
    }
  
  
    userInterests.findAll({ where: { user_id: req.params.id ,type:"seeker"} })
      .then(interests => {
        // get list of current interest_ids
  
        const interestsIds = interests.map(({ interest_id }) => interest_id);
     console.log(interestsIds);
      
        // create filtered list of new interests
        const newInterests = req.body.interestIds
          .filter((interest_id) => !interestsIds.includes(interest_id))
          .map((interest_id) => {
            return {
              user_id: req.params.id,
              job_id: interest_id,
              type:"seeker"
              
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


// DELETE single user
router.delete('/:id', (req, res) => {
    Users.destroy({
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