const  Sequelize =require('sequelize') ;
const Post = require ("../models/posts.js");
const User = require("../models/users.js");
const jwt=require(`jsonwebtoken`)
const  {JSDOM}  = require('jsdom');

// Your code here...



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
    console.log(" this is req",req.params.id)
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
exports.addpost=async (req,res)=>{
    let post;
    console.log("currently adding post")
const token=req.cookies.access_token
if(!token)
{console.log("hi folks")
    return res.status(401).json("Not authenticated!")
    
}
jwt.verify(token,"jwtkey",(err,userInfo)=>{
    if(err)
    return res.status(403).json("Token is not valid!")
else{
    console.log(req.body.desc,"this is the desc")
    const desc = req.body.desc;
        const dom = new JSDOM(`<body>${desc}</body>`);
        const textOnly = dom.window.document.querySelector('body').textContent;//to remove paragraph tag

        console.log(textOnly, "this is the desc");

     post= Post.create({
        title:req.body.title,
        desc:textOnly,
        cat:req.body.cat,
        image:req.body.img,
        date:req.body.date,
        UserId:userInfo.id
    })
    
}


})
if(post)
res.status(200).json("successfully created post")
else
res.status(500).json("failed")

    
}
exports.deletepost=async(req,res)=>{
    const postans=await Post.findOne({where:{id:req.params.id}})
    console.log("delete initiated")
    const token=req.cookies.access_token
    console.log(req)
    console.log(token)
    if(!token)
    {console.log("hi folks")
        return res.status(401).json("Not authenticated!")  
    }
    else
    {
        jwt.verify(token,"jwtkey",(err,userInfo)=>{
        if(err)
        return res.status(403).json("Token is not valid!")
    else{
        console.log("this is delete details")
        console.log("user id",userInfo)
        console.log("post id",Post.UserId)
        
        console.log("this is postans",postans)
        if(userInfo.id==Post.dataValues.UserId)
            { const post =Post.destroy({where:{id:req.params.id}})
            res.status(200).json({message:"Successfully deleted"})}
            else{
                res.status(401).json({message:"You are not authorized"})
            }
    }})
        
    }
   
    
// jwt.verify(token,"jwtkey",(err,userInfo)=>{
//     if(err)
//     return res.status(403).json("Token is not valid!")
//     console.log("delete initiated")
//     console.log(userInfo.id)
//     console.log(Post)

//     if(userInfo.id==Post.UserId)
//     { const post =Post.destroy({where:{id:req.params.id}})
//     res.status(200).json({message:"Successfully deleted"})}
//     else{
//         res.status(401).json({message:"You are not authorized"})
//     }
   
// })
    
    
}
exports.updatepost=async (req,res)=>{
    const postans=await Post.findOne({where:{id:req.params.id}})
    const token=req.cookies.access_token
    console.log("this is the body",req.body)
    console.log(token)
    if(!token)
    {console.log("hi folks")
        return res.status(401).json("Not authenticated!")  
    }
    else
    {
        jwt.verify(token,"jwtkey",(err,userInfo)=>{
            console.log(userInfo)
        if(err)
        return res.status(403).json("Token is not valid!")
    else{
        console.log("user id",userInfo.id)
        console.log("post id",Post.UserId)
        if(userInfo.id==postans.dataValues.UserId)
            { 
                const desc = req.body.desc;
        const dom = new JSDOM(`<body>${desc}</body>`);
        const textOnly = dom.window.document.querySelector('body').textContent;
               let post= {
                    title:req.body.title,
                    desc:textOnly,
                    cat:req.body.cat,
                    image:req.body.img,
                    date:req.body.date,
                    UserId:userInfo.id
                }
             Post.update(post, { where: { id: req.params.id } })
            res.status(200).json({message:"Successfully updated"})}
            else{
                res.status(401).json({message:"You are not authorized"})
            }
    }})
        
    }
    
}