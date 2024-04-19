const express = require("express")
const { getpost,getposts,addpost,deletepost,updatepost }=require("../controllers/post.js") 
const router=express.Router()
router.get("/getpost/:id",getpost)
router.get("/getposts",getposts)
router.post("/addpost",addpost)
router.delete("/deletepost/:id",deletepost)
router.put("/updatepost/:id",updatepost)

module.exports=router
