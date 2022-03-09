const express = require('express');
const router = express.Router();
const passport = require('passport');
const postController = require('../controllers/post_controller');
// after /posts
// check wether the post is via authenticated user or not.
router.post('/create',passport.checkAuthentication, postController.post);
router.get('/destroy/:id',passport.checkAuthentication,postController.destroy);
module.exports = router;