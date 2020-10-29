const router = require('express').Router();

const userRoutes = require('./user-routes');
const postRoutes = require('./job-routes');
const interestRoutes = require('./interest-routes');

router.use('/interests', commentRoutes);

router.use('/users', userRoutes);
router.use('/jobs', postRoutes);

module.exports = router;