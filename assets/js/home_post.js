{
//method to submit the form data for new post using AJAX
let createPost = function(){
    let newPostForm = $('#new-post-form');
    newPostForm.submit(function(e){  // e is event here
             e.preventDefault();
        // no default thing will happen i.e post submission will not happen, i don't want it submit naturally

            

            // manually submitting  form using ajax
          $.ajax({
               type:'post', // post request
               url: '/posts/create',
               data:newPostForm.serialize(),
                // serialize coverts the form data into json,content ==key and value==what is filled in the form
               success : function(data){
                   console.log(data);
               },error: function(error){
                   console.log(error,responseText);
               }
             });
    });
}

createPost();
//method to create a post in DOM
}