const express = require("express")
const {register,login,logout} =require("../controllers/auth.js") 

// import {login} from "../controllers/auth.js"
// import {logout} from "../controllers/auth.js"
const router=express.Router()
router.post("/register",register)
router.post("/login",login)
router.post("/logout",logout)
module.exports=router