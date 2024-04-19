// import { where } from "sequelize";
const User = require("../models/users.js");
const jwt=require(`jsonwebtoken`)


const bcrypt =require("bcrypt") 
exports.register=(req,res)=>{
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, function(err, salt) {
        console.log(req)
        console.log(req.body)
        const { name, password, email } = req.body;
        bcrypt.hash(password, salt, function(err, hash) {
            // Store hash in your password DB.
            if(err)
            {
                res.status(500).json(err)
            }
            else{
                
                User.create({name,password:hash,email})
                .then(()=>{
                    res.status(201).json({message:"Successfully created new user"})
                })
                .catch(()=>{
                    res.status(501).json("User already exists")
                })
            }
        });
    });
 
    

}
exports.login= async (req,res)=>{
    const user=await User.findOne({where:{name:req.body.name}})
    console.log(user)
    const{password,...other}=user.dataValues
    if (!user) {
        return res.status(400).json({ success: false, message: 'User not found' });
    }
    console.log(user)
    const ispasswordcorrect=bcrypt.compareSync(req.body.password, user.password)
        
        // console.log(user.id)
        // if(err){
        //     throw new Error('Something went wrong')  
        // }
        // if(result===true)
        if(ispasswordcorrect)
        {
            const token = jwt.sign({ id: user.id,name:user.name }, `jwtkey`);
            console.log(token)
            console.log("haihello",other)
            res.cookie("access_token", token, {
                httpOnly: true
            }).status(200).json(other);
      } else {
        return res.status(400).json({ success: false, message: 'Password is incorrect' });
      }
    //   const token=jwt.sign({id:user.data},"jwtkey")
    //   res.cookie("access_token",token,{
    //     httpOnly:true
    //   }).status(200).json(user.name,user.email)
    // , function(err, result) { });
}
exports.logout = (req, res) => {
    res.clearCookie("access_token",{
        // httpOnly: true,
        // path: "/"
      sameSite:"none",
      secure:true
    }).status(200).json("User has been logged out.")
  };