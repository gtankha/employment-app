const router = require('express').Router();
const { Users, Jobs, userInterests, Skills, userSkills, jobSkills } = require('../../models');

// GET all users
router.get('/', (req, res) => {

    Users.findAll()
    .then(result=>res.status(200).json(result))
    .catch(err => res.status(200).json(err))



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
  Users.findOne({
    exclude: ['password']
    ,
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Skills,
        attributes: ['name'],
        through: userSkills
      },
      {
        model: userInterests,
        attributes: ['id', 'job_id', 'type'],
        as: "interested_in"
        // model:Jobs,
        // through: userInterests,
        // as: 'job_interests',
        // include:{model:Users,as:"company",attributes:{exclude:['password']}}
      }
    ]
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      const userName = dbUserData.full_name;
      const userDescription = dbUserData.description;
      const userId = dbUserData.id;
      const company = true;
      console.log(dbUserData);
      if(req.session.type === "company"){
        res.render('employee-page', {
          userName,
          userDescription,
          userId,
          company
        });
      }else{
        res.render('employee-page', {
          userName,
          userDescription,
          userId,
        });
      }
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
        image:null,
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
                console.log(dbUserData)
            });

        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


//login
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

    if ((((typeof (req.body.skillIds) === 'undefined'))) && (((typeof (req.body.interestIds) === 'undefined')))) {

        Users.update(req.body,

            { where: { id: req.params.id } }

        )
            .then(result => {

                Users.findOne({
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


    }

    if ((!(typeof (req.body.skillIds) === 'undefined'))) {
        userSkills.findAll({ where: { user_id: req.params.id } })
            .then(skills => {
                // get list of current interest_ids

                const skillIds = skills.map(({ skill_id }) => skill_id);
                console.log(skillIds);

                // create filtered list of new interests
                const newSkills = req.body.skillIds
                    .filter((skill_id) => !skillIds.includes(skill_id))
                    .map((skill_id) => {
                        return {
                            user_id: req.params.id,
                            skill_id: skill_id
                        };
                    });
                console.log(newSkills);

                // figure out which ones to remove
                const skillsToRemove = skills
                    .filter(({ skill_id }) => !req.body.skillIds.includes(skill_id))
                    .map(({ id }) => id);

                console.log(skillsToRemove);

                // run both actions
                return Promise.all([
                    userSkills.destroy({ where: { id: skillsToRemove } }),
                    userSkills.bulkCreate(newSkills)
                ]);
            })
            .then((updatedSkillIds) => res.json(updatedSkillIds))
            .catch((err) => {
                // console.log(err);
                res.status(400).json(err);
            });
    }


    if (!(typeof (req.body.interestIds) === 'undefined')) {

        // if there's already seeker interest in this job, update the type to "interview"

        userInterests.findAll({ where: { user_id: parseInt(req.params.id), job_id: req.body.interestIds[0],type:"employer" } })
            .then(result => {
                if (result.length) {

                    userInterests.update({ type: "interview" }, { where: { user_id: req.params.id, job_id: req.body.interestIds[0], type: "employer" } })
                        .then(result => {

                            console.log(result)
                            res.status(200).json(result);

                        })
                        .catch(err=>console.log(err))
                }
                // if there isn't seeker interest, create company interest
                else {


                    userInterests.findAll({ where: { user_id: req.params.id, type: "seeker" } })
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
                                        type: "seeker"

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

                }
            })
    }
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