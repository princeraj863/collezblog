

// module.exports.actionName = function(req,res){} 

const Post = require("../models/post");

//to export a function which is publicly available to routes
module.exports.home = function(req,res){
    
    // Post.find({},function(err,posts){  TO COMMENT ALL SELECTED LINE USE CTRL +K+C
    //     return res.render('home',{
    //         title : "Home",
    //         posts :posts
    //      });
    // });

    //populate the user of each post i.e we can now get get posts.user.name 

    Post.find({}).populate('user').exec(function(err,posts){
        return res.render('home',{
                    title : "Home",
                    posts :posts
             });

    });

    
}