const  Sequelize =require('sequelize') ;
const Post = require ("../models/posts.js");
const User = require("../models/users.js");

exports.getposts=async (req,res)=>{
    const cat=req.query.cat
    if(cat)
    {
        var posts=await Post.findAll({where:{cat:cat}})
    }
    else{
        var posts=await Post.findAll()
    }
    
    console.log(posts)
    if(posts)
    {
        res.status(200).json(posts)
        
    }
    else
    res.send("no data")
   
}
exports.getpost=async(req,res)=>{
    console.log(" this is req",req.params)
    const post=await Post.findOne({where:{id:req.params.id},include: [
        {
            model: User,
            attributes: ['img','name'], // Specify the fields you want to include from the User model
            where: { id: Sequelize.col('Post.userId') } // Filter users based on the userId from the Post model
        }
    ]})
    console.log("you are now seeing post",post)
    res.status(200).json(post)
}
exports.addpost=(req,res)=>{

    
}
exports.deletepost=(req,res)=>{
    const token=req.cookies.access_token
    if(!token)
    return res.status(401).json("Not authenticated!")
JsonWebTokenError.verify(token,"jwtkey",(err,userInfo)=>{
    
}
    console.log("delete initiated")
    const post =Post.destroy({where:{id:req.params.id}})
    res.status(200).json({message:"Successfully deleted"})
    
}
exports.updatepost=(req,res)=>{
    
}