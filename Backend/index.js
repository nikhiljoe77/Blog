const express = require("express")
const authroutes =require("./routes/auth.js") ;
const postroutes=require( "./routes/posts.js");
const userroutes = require("./routes/users.js");
const Sequelize = require('./db.js');
const cors = require("cors")
const cookieparser =require("cookie-parser");
const Post = require ("./models/posts.js");
const User = require('./models/users.js');
const app = express();
const multer=require("multer")
// const upload=multer({dest:'./uploads/'})


app.use(express.json());
app.use(cookieparser())
app.use(cors({
  origin: 'http://localhost:5173', // Adjust the origin based on your frontend URL
  credentials: true
}))
User.hasMany(Post)
Post.belongsTo(User)
app.use("/auth", authroutes);
app.use("/post", postroutes);
app.use("/user", userroutes);
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb(null, './upload')
    cb(null, "../frontend/public/upload");
  },
  filename: function (req, file, cb) {

    cb(null, Date.now() + file.originalname)
  }
})

const upload = multer({ storage: storage })
app.post('/upload', upload.single('file'), function (req, res,) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  const file=req.file
  console.log("hi multerers")
  res.status(200).json(file.filename)
})



  Sequelize.sync()
  .then(()=>{
    console.log("tables have been created successfully")
    app.listen(8800, () => {
      console.log("connected");
    });
  })
  
  .catch((err)=>{
    console.log(err)

  })

