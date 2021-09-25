const express = require("express");
const { userInfo } = require("os");

const User = require('../models/user'); // Requiring database

module.exports.profile = function(req,res){ //http://localhost:8000/users/profile
    
    User.findById(req.params.id,function(err,user){
        return res.render('user_profile',{ // here it renders user_profile.ejs view/template
            //it's view destination is set in index.js file 
            title : 'User Profile',
            profile_user: user //we can't use the word 'user' as it's keyword in locals
       });
    });
     
}

module.exports.update = function(req,res){
    if(req.user.id==req.params.id){ 
        // if not done then from inspect user with any other object id can change any other info
        User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
            /* here User.findByIdAndUpdate(req.params.id,{name:req.body.name,email:req.body.email},
                function(err,user)
            using req.body instead by simplicity
            */
            return res.redirect('back');
        });
    }else{
        return res.status(401).send('Unauthorized');
    }
}

//render the sign up page
module.exports.signUp =function(req,res){

    //if user is authenticated then it won't be able to go on sign up page  
    if(req.isAuthenticated()){
        res.redirect('/users/profile');
    }

    return res.render('user_sign_up',{
            title :"Coolzblog | Sign Up"
    });
}

// render the sign in page
module.exports.signIn =function(req,res){

    //if user is authenticated then it won't be able to go on sign in page  
    if(req.isAuthenticated()){
        res.redirect('/users/profile');
    }

    return res.render('user_sign_in',{
            title :"Coolzblog | Sign In"
    });
}

//get the sign up data
module.exports.create = function(req,res){
    if(req.body.password !=req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email},function(err,user){
        if(err){console.log('error in finding user in signing up'); return;}

        if(!user){
          User.create(req.body,function(err,user){
              if(err){console.log('error in creating user while signing up'); return;}
              
              return res.redirect('/users/sign-in');
          })
        }
        else{
            req.flash('error','Email already exist');
            return res.redirect('back');
        }
    });
}

//sign in and create a session for the user
module.exports.createSession = function(req,res){
    req.flash('success','Logged in Successfully');//in req object adding flash object with type=success 
    /* to send flash message to res we have to write explicitly eveytime for flash message
      return res.redirect('/',{flash:{success:""}});
      hence for simplicity we create our custom middleware in config folder with file name middleware.js
    */
    return res.redirect('/');
}

module.exports.destroySession = function(req,res){
    req.logout();
    req.flash('success','You have looged out');

    return res.redirect('/');
}

