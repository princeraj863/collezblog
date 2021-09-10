
module.exports.profile = function(req,res){ //http://localhost:8000/users/profile
    
     res.end('<h1>profile page</h1>');
}

//render the sign up page
module.exports.signUp =function(req,res){

    return res.render('user_sign_up',{
            title :"Coolzblog | Sign Up"
    });
}

// render the sign in page
module.exports.signIn =function(req,res){

    return res.render('user_sign_in',{
            title :"Coolzblog | Sign In"
    });
}