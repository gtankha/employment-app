const router = require('express').Router();

const userRoutes = require('./user-routes');
const jobRoutes = require('./job-routes');
const interestRoutes = require('./interest-routes');
const skillRoutes = require('./skill-routes');
const jobuserskillRoutes = require('./job-user-skill');
const uploadRoutes = require('./upload-routes')

router.use('/interests', interestRoutes);

router.use('/users', userRoutes);
router.use('/jobs', jobRoutes);
router.use('/skills', skillRoutes);
router.use('/jobuserskills', jobuserskillRoutes);
router.use('/upload',uploadRoutes);

module.exports = router;