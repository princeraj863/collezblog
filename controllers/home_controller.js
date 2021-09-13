

// module.exports.actionName = function(req,res){} 

const Post = require("../models/post");

//to export a function which is publicly available to routes
module.exports.home = function(req,res){
    
    Post.find({},function(err,posts){
        return res.render('home',{
            title : "Home",
            posts :posts
         });
    });
    
}