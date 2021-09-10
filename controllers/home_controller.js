
// module.exports.actionName = function(req,res){} 
//to export a function which is publicly available to routes
module.exports.home = function(req,res){
    return res.end('<h1> Express is up for coolzblog! </h1>');
}