

// module.exports.actionName = function(req,res){} 
//to export a function which is publicly available to routes
module.exports.home = function(req,res){
    console.log("home loaded");
    return res.render('home',{
       title : "Home"
    });
}