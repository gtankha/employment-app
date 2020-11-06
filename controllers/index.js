const router = require('express').Router();

const apiRoutes = require('./api');

const homepageRoutes = require('./homepage-routes');
const dashboardRoutes = require('./dashboard-routes');

// const dashboardRoutes = require('./dashboard-routes');

// router.use('/dash', dashboardRoutes);

router.use('/api', apiRoutes);
router.use('/test-skills', dashboardRoutes);

router.use('/', homepageRoutes);

router.use((req, res) => {
  res.status(404).end();
});


module.exports = router;