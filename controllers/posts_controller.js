const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = function(req,res){
    Post.create({
       content : req.body.content,
       user : req.user._id
    }, function(err,post){
      if(err){console.log('erroe in creating a post'); return ;}

      return res.redirect('back');
    });
}

module.exports.destroy = function(req,res){
  Post.findById(req.params.id,function(err,post){
      //.id means converting the object id into string , before it was req.user._id
      if(post.user==req.user.id){ // checking if it's user's own post
        post.remove();
         
        Comment.deleteMany({post:req.params.id},function(err){ // deleting comments related to post
               return res.redirect('back');
        });

      }else{
        return res.redirect('back')
      }
  });
}