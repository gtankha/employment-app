const router = require('express').Router();

const apiRoutes = require('./api');

const homepageRoutes = require('./homepage-routes');
const dashboardRoutes = require('./dashboard-routes');

<<<<<<< HEAD
 const dashboardRoutes = require('./dashboard-routes');

 router.use('/dash', dashboardRoutes);
=======
const testSkillsRoutes = require('./matchingskills-routes');

router.use('/dash', dashboardRoutes);
>>>>>>> ba8cfa51c328506018355e05f1dd26c6ead224de

router.use('/api', apiRoutes);
router.use('/test-skills', testSkillsRoutes);

router.use('/', homepageRoutes);

router.use((req, res) => {
  res.status(404).end();
});


module.exports = router;