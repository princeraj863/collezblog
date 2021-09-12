const express = require('express');
const router = express.Router();
const passport = require('passport')

const usersController = require('../controllers/users_controller');

router.get('/profile',usersController.profile);

router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);
 
router.post('/create',usersController.create);

//use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
),usersController.createSession);
/*router.post request comes to 'create/session' , passport.authenticate --> authenticates it
if it is done then usersController.createSession is called otherwise  failureRedirect: '/users/sign-in' 
gets called*/

module.exports = router;