const router = require('express').Router();
const apiRoutes = require('./api');
const homepageRoutes = require('./homepage-routes');
const dashboardRoutes = require('./dashboard-routes');
const dashInterestRoutes = require('./dash-interest-routes');
const testSkillsRoutes = require('./matchingskills-routes');
const listSkillRoutes = require('./listskill-routes');
const edit = require('./edit-route')

router.use('/dash-interests', dashInterestRoutes);
router.use('/edit', edit);
router.use('/dash', dashboardRoutes);

router.use('/api', apiRoutes);
router.use('/test-skills', testSkillsRoutes);
router.use('/test2-skills', listSkillRoutes);

router.use('/', homepageRoutes);

router.use((req, res) => {
  res.status(404).end();
});


module.exports = router;