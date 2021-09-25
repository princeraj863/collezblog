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
        let newPost = newPostDom(data.data.post);//the data created upon post creation has key data in which it has post 
//to append it to the list,  #posts-list-container>ul this means inside posts-list container there's ul inside it
        $('#posts-list-container>ul').prepend(newPost);//here prepend will put new post at first

        deletePost($(' .delete-post-button',newPost));// .delete-post-button this class is inside newPost,populated deletepost
               },error: function(error){
                   console.log(error,responseText);
               }
             });
    });
}

createPost();
//method to create a post in DOM

/*using backtick and wherever to print use ${variable} inside backtick
example --  id="post-<%= post._id %>" instead of this it's   id="post-${ post._id }"
putting whole post in backtick
removed  <% if(locals.user){ %>   user is already signed in so not needed this(not sure)
*/


/* this function help in coverting this text html to actual html i.e jquery object
*/
let newPostDom = function(post){ // post data which we received
    return $(`<li id="post-${ post._id }">
    <!--added id because at some point to delete this post we need id assigned to it-->
    <p>
    
       
        <small>
            <a class="delete-post-button" href="/posts/destroy/${ post._id }">X</a>

            <!--add class to this delete button so that we can add click listner to it 
            to delte it using ajax and add styling-->
        </small>
        ${ post.content }
        <br>
        <small>
            ${ post.user.name }

        </small>
    </p>
    <div class="post_comments">
         
        <form action="/comments/create" method="POST">
            <input type="text" name="content" placeholder="Type Here to add comment..">
            <input type="hidden" name="post" value="${ post._id }">
            <input type="submit" value="Add Comment">

        </form>

        

        <div class="post-comment-list"> 
            <ul id="post-comments-${post._id} "> <!--to identify id later-->
               
            </ul>
        </div>
    </div>
</li>`)


    
}

}

/* for deleting two things-
1) to be able to send data to controller to delete it
2) once confirmed remove it from where it is shown i.e in the dom
*/

//method to delete a POST from DOM

let deletePost = function(deleteLink){ //here deleteLink chosen as we'll pass href tag and simulate a click on it
   $(deleteLink).click(function(e){
     e.preventDefault();

     $.ajax({
          type : 'get',
          url : $(deleteLink).prop('href'),//value of href in a tag
          success : function(data){// this data has id of the post to be deleted
            $(`#post-${data.data.post_id}`).remove();
          },error:function(error){
              console.log(error.responseText);
          }
     });
   });
}








