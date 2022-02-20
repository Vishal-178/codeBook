const express = require('express');
const router = express.Router();

console.log('user lode sucessfuly');
const userController = require('../controllers/user_controller');

router.get('/login',userController.login);
router.get('/signup',userController.signup);
router.post('/create',userController.create);
router.post('/auth',userController.auth);
router.get('/profile',userController.profile);
router.get('/signout',userController.signout);

module.exports = router;