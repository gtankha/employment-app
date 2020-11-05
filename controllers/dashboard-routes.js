const router = require('express').Router();
const { Users, Jobs, userInterests, Skills, userSkills, jobSkills } = require('../models');


router.get('/', (req, res) => {
    res.render('dashboard', {});
})