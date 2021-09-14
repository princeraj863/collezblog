const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req,res){
    Post.findById(req.body.post,function(err,post){ //req.body.post as in form data it's name is post,if post is founud
         if(post){
             Comment.create({
               content: req.body.content,
               post:req.body.post,
               user: req.user._id //
             },function(err,comment){
                 //handle error

                 //adding comment to the post,it will automatically fetch out the id and push it
                post.comments.push(comment);
                 
                post.save();//it tells the database it's final version so save it, before that it remains in ram

                 res.redirect('/');
             }
             
             );
         }
    });

}