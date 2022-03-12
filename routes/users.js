const express = require('express');
const router = express.Router();
const passport = require('passport');


console.log('user lode sucessfuly');
const userController = require('../controllers/user_controller');

router.get('/login',userController.login);
router.get('/signup',userController.signup);
router.post('/create',userController.create);
// profile page 
router.get('/profile/:id', passport.checkAuthentication,userController.profile);
// use passport as a middleware to authenticate.
router.post('/auth', passport.authenticate(
    'local',
    {failureRedirect: '/users/login'},
) , userController.auth);

router.get('/signout',userController.signout);
router.post('/update/:id',userController.update);

module.exports = router;