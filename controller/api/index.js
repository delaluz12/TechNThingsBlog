//index for the api routes within the api folder
//import express router
const router = require('express').Router();


//import all routes within foler
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');

//set router to use these routes
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);

//export router
module.exports = router;
