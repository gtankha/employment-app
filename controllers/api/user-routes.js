const router = require('express').Router();
const { Users, Jobs, userInterests } = require('../../models');

// GET all users
router.get('/', (req, res) => {
    
    // Access our User model and run .findAll() method)
    User.findAll({attributes: { exclude: ['password'] }})
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
    User.findOne({ 
        attributes: { exclude: ['password'], include: [
            {
              model: Post,
              attributes: ['id', 'title', 'text', 'created_at']
            }
          ] },
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

// create new user
router.post('/', (req, res) => {


  
    User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })
      .then(dbUserData => { 
        
        req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
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

  User.findOne({
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
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;
    
        res.json({ user: dbUserData, message: 'You are now logged in!' });
      });
    

  });  
  
  })
  

// update user
router.put('/:id', (req, res) => {
  
  
    // if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
    User.update(req.body, {
        individualHooks: true,
      where: {
        id: req.params.id
      }
    })
      .then(dbUserData => {
        if (!dbUserData[0]) {
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

// DELETE single user
router.delete('/:id', (req, res) => {
    User.destroy({
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