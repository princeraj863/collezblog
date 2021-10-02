module.exports.index = function(req,res){
    console.log("hello");
    return res.json(200,{
        message :"List of posts",
        posts:[]
    })
}