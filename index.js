 const express=require('express');
 const app= express();
 const port = 8000;
 
 // use express router
app.use('/',require('./routes'));


//set up view engine
app.set('view engine','ejs');

app.set('views','./views');//here not used path.join like that as we can do it like this also
 app.listen(port,function(err){
 
    if(err){
        console.log(`error in running the server:${port}`);
        // here backticks i.e `` inside it works as string until to use variable inside string use ${variable}
    }

    console.log(`server is running on port:${port}`);

 });