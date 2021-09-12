const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

//authenticating using passport, see passport.js username & password section

passport.use(new LocalStrategy({
   usernameField :'email'
   },
   function(email,password,done){  // here done is callback function , it's reporting back for passport.js
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
            return done(null,user);//returning user , which can be used in serialiser

       });
   }
));

//serializing the user to decide which key is to be kept in the cookies and
// the rest and this info gets encrypted
passport.serializeUser(function(user,done){
  done(null,user.id);// serialiser will store the used.id in session cookie which gets encrypted 
  //using express session key which we defined 
});

//deserializing the user from the key in the cookies
/*when the cookie is being sent back to the server  and we are establishing the identity which data is
there from the database, we are using that id to find the user , this is deseralising*/
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