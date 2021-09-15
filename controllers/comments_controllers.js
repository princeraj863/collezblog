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

module.exports.destroy = function(req,res){
    Comment.findById(req.params.id,function(err,comment){
//console.log(req.user.id); it's from passport.js , object is req.user inside it authentication info are stored
//console.log(comment);in this that comment whole info is stored which got found 
     if(comment.user==req.user.id){
         let postId = comment.post; 
         // before deleting comment we keep postid of this commment, we keep it in variable 
         //to delete comment from the post db by using postid

         comment.remove();
         Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}},function(err,post){ //it pulls out that comment given 
             return res.redirect('back');
         });
     }else{
         return res.redirect('back');
     }
    });
}