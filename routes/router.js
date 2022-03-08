const express = require('express');
const router = express.Router();
const passport = require('passport');
const homeController = require('../controllers/home_controller');

console.log('router loaded home controller');
// router.get('/',homeController.home);
router.get('/',homeController.home);
router.use('/users', require('./users'));
router.use('/posts', require('./posts'));
router.use('/comments',require('./comments'));
// router.post('/post',postController.post);
module.exports = router;