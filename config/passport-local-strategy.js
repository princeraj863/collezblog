const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

//authenticating using passport, see passport.js username & password section

passport.use(new LocalStrategy({
   usernameField :'email'
   },
   function(email,password,done){  // here done is callback function , it's for passport.js function
       //find a user and establish the identity
       User.findOne({email:email},function(err,user){ //1st email is data user email i.e stored in db,
        // 2nd email is vaue  which is passed on  function parameter  
            if(err){
                console.log('Error in finding user -->Passport');
                return done(err);
            }

            if(!user || user.password !=password){
                console.log('Invalid Username/Password');
                return done(null,false);
            }
            return done(null,user);

       });
   }
));

//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
  done(null,user.id);
});

//deserializing the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
       if(err){
           console.log('error in finding user -->Passport');
           return done(err);
       }
       return done(null,user);
    });
});


module.exports = passport;