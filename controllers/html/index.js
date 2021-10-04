//index for html routes within html folder
//import router
const router = require('express').Router();

//import all routes within folder
const homeRoutes = require('./homepageRoutes');
const dashRoutes = require('./dashboardRoutes');

//set router to use the routes from above
router.use('/', homeRoutes);
router.use('/dashboard', dashRoutes);

//export router
module.exports = router;
