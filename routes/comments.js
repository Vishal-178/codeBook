const express = require('express');
const router = express.Router();
const passport = require('passport');
const postComment = require('../controllers/comments_controller');

// check wether the comment is via authenticated user or not,
router.post('/create',passport.checkAuthentication,postComment.create)
router.get('/destroy/:id', passport.checkAuthentication,postComment.destroy);
module.exports = router;