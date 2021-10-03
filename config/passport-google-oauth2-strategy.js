const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

// tell passport t o use a new strategy for google login
passport.use(new googleStrategy({
 clientID :"367208562468-mp0lgkn0p1pmfthgou44qbpusma9tlb3.apps.googleusercontent.com",
 clientSecret:"SM7x1UBKWXPN-mFuq3ygOlph",
 callbackURL :"http://localhost:8000/users/auth/google/callback"
},
   //if access token expires then refresh token gives you new token, without asking the user
   //profile contains user info
   function(accessToken,refreshToken,profile,done){
       //a user can have multile gmail, profile.email gives an array of emails, here checking first email
       // find user
       User.findOne({email:profile.emails[0].value}).exec(function(err,user){
            if(err){console.log('error in google-Strategy-passport',err); return ;}

            console.log(profile);

            if(user){
                // if found , set this user as req.user (set as req.user means singing the user)
                return done(null,user);
            }else{
                //if not found , create the user and set it as req.user
                User.create({
                    name:profile.displayName ,
                    email:profile.emails[0].value,
                    password : crypto.randomBytes(20).toString('hex') // length 20 and hex is hexadecimal
                },function(err,user){
                    if(err){console.log('error in google-Strategy-passport',err); return ;}

                    return done(null,user);
                });
            }
       }) ;
   }

   




));

module.exports = passport
