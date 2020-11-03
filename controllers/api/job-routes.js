const router = require('express').Router();
const { Users, Jobs, userInterests, jobSkills, Skills } = require('../../models');

// GET all Jobs
router.get('/', (req, res) => {

    Jobs.findAll(
        {
            exclude: ['password']
            , include: [{
                model: Users,
                attributes: ['id', 'description', 'company_name']
            },
            {
                model: Skills,
                attributes: ['name'],
                through: jobSkills
            },
            {
                model: userInterests,
                attributes: ['id', 'user_id', 'type'],
                as: "job_interests"
            }
            ]

        })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
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
            },
            {
                model: Skills,
                attributes: ['name'],
                through: jobSkills
            },
            {
                model: userInterests,
                attributes: ['id', 'user_id', 'type'],
                as: "jobs_interests"
            }
            ],
        where: { id: req.params.id }

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

    if ((((typeof (req.body.skillIds) === 'undefined'))) && (((typeof (req.body.interestIds) === 'undefined')))) {

        Jobs.update(req.body,

            { where: { id: req.params.id } }

        )
            .then(result => {

                Jobs.findOne({
                    where: {
                        id: req.params.id
                    }
                }
                )
                    .then(updatedJob => res.json(updatedJob));


            })

            .catch((err) => {

                res.status(400).json(err);
            });


    }
    if ((!(typeof (req.body.skillIds) === 'undefined'))) {
        jobSkills.findAll({ where: { job_id: req.params.id } })
            .then(skills => {
                // get list of current interest_ids

                const skillIds = skills.map(({ skill_id }) => skill_id);
                console.log(skillIds);

                // create filtered list of new interests
                const newSkills = req.body.skillIds
                    .filter((skill_id) => !skillIds.includes(skill_id))
                    .map((skill_id) => {
                        return {
                            job_id: req.params.id,
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
                    jobSkills.destroy({ where: { id: skillsToRemove } }),
                    jobSkills.bulkCreate(newSkills)
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

        userInterests.findAll({ where: { job_id: req.params.id, user_id: req.body.interestIds[0], type: "seeker" } })
            .then(result => {

                if (result.length) {

                    userInterests.update({ type: "interview" }, { where: { job_id: req.params.id, user_id: req.body.interestIds[0], type: "seeker" } })
                        .then(result => {

                            console.log(result)

                        })
                        .catch(console.log(err))
                }
                // if there isn't seeker interest, create company interest
                else {


                    userInterests.findAll({ where: { job_id: req.params.id, type: "employer" } })
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
                                        type: "employer"

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
            .catch(err => res.json(400).json(err))




    }
});


router.delete('/:id', (req, res) => {

    Jobs.destroy({ where: { id: req.params.id } })
        .then(result => res.status(200).json(result))
        .catch((err) => res.status(400).json(err))

})

module.exports = router;



