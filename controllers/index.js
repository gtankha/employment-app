const router = require('express').Router();

const apiRoutes = require('./api');

const homepageRoutes = require('./homepage-routes');
const dashboardRoutes = require('./dashboard-routes');

const testSkillsRoutes = require('./testskills-routes');

router.use('/dash', dashboardRoutes);

router.use('/api', apiRoutes);
router.use('/test-skills', testSkillsRoutes);

router.use('/', homepageRoutes);

router.use((req, res) => {
  res.status(404).end();
});


module.exports = router;