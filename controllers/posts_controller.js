const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(req,res){
   
  try{
   let post = await Post.create({
       content : req.body.content,
       user : req.user._id
  });

      if(req.xhr){ // to check if the request is ajax ,request type of ajax request is xmlHttpRequest i.e xhr
        return res.status(200).json({ //returning json 
            data:{
              post:post
            },
            message :"Post created!" // adding  message to json data;
        });

      }

  req.flash('success','Post Published'); // key , value  uses middleware defined by us
    return res.redirect('back');
  }catch(err){
    req.flash('error',err);
    return ;
  }
}

module.exports.destroy = async function(req,res){

  try{
 let post= await Post.findById(req.params.id);
      //.id means converting the object id into string , before it was req.user._id
      if(post.user==req.user.id){ // checking if it's user's own post
        post.remove();
         
     await Comment.deleteMany({post:req.params.id}); // deleting comments related to post
        
     req.flash('success','Post and associated comments deleted!');
     
     return res.redirect('back');
        

      }else{
        req.flash('error','Post and associated comments deleted!');
        return res.redirect('back')
      }
  
}catch(err){
  req.flash('error','You cannot delete this post');
  return res.redirect('back');
}
}