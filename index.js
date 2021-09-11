 const express=require('express');
 const cookieParser = require('cookie-parser');
 const app= express();
 const port = 8000;
 const expressLayouts = require('express-ejs-layouts');
 const db = require('./config/mongoose');
 
 app.use(express.urlencoded());
 /* app.use whenever used then it means middleware is called
  it takes request and convert form data and put it on request.body(in key:value pair) */


app.use(cookieParser());


//extract style and scripts from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);



// use express router
app.use('/',require('./routes'));


//set up view engine
app.set('view engine','ejs');

app.set('views','./views');//here not used path.join like that as we can do it like this also



app.use(express.static('assets'));
/* it will look for folder named assets in the directory and
look for static file like html,css,js
in home.ejs just link href ="/css/home.css" as it will look in assets folder for html,css and js
 
*/




 app.listen(port,function(err){
 
    if(err){
        console.log(`error in running the server:${port}`);
        // here backticks i.e `` inside it works as string until to use variable inside string use ${variable}
    }

    console.log(`server is running on port:${port}`);

 });