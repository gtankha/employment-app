const router = require('express').Router();

const userRoutes = require('./user-routes');
const jobRoutes = require('./job-routes');
const interestRoutes = require('./interest-routes');

router.use('/interests', interestRoutes);

router.use('/users', userRoutes);
router.use('/jobs', jobRoutes);

module.exports = router;