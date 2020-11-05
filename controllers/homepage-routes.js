const router = require('express').Router();
const session = require('express-session');
const { Users, Jobs, userInterests, Skills, userSkills, jobSkills } = require('../models');

// GET all users
router.get('/', (req, res) => {

    console.log(req.query);

    if (req.session.type === "company") {
            Users.findAll({
                attributes: { exclude: ['password'] },
                where: {
                    type: "seeker"
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
                        as: "interested_in",
                        include: { model: Jobs, as: "interested_in", attributes: { exclude: ['password', 'id'] } }
                    },
                ]
            })
            .then(dbUserData => {
                console.log(dbUserData);
                const users = dbUserData.map(post => post.get({ plain: true }));
                res.render('homepage', {
                    users,
                    loggedIn: req.session.loggedIn,
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    } else {
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
                // {
                //     model: userInterests,
                //     attributes: ['id', 'user_id', 'type'],
                //     as: "job_interests"
                // }
                ]

            })
            .then(dbJobData => {
                console.log(dbJobData)
                const jobs = dbJobData.map(post => post.get({ plain: true }));
                console.log(jobs)
                res.render('homepage', {
                    jobs,
                    loggedIn: req.session.loggedIn,
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    }

});

router.get('/interest-page', (req, res) => {
    res.render('test-page',{});
})

//login
router.get('/login', (req, res) => {
    res.render('login');
});

module.exports = router;