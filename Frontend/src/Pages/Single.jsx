import "./Single.css";
import pattern from "../assets/pattern.jpg";
import { useLocation,useNavigate,Link } from "react-router-dom";
import { useState,useEffect,useContext } from "react";
import moment from "moment"
import { AuthContext } from "../context/authContext";
import axios from "axios";


export default function Single() {
  const navigate=useNavigate()
  const currentUser=useContext(AuthContext)
  const [post, setPost] = useState({});
  const location = useLocation()
  const postId=location.pathname.split("/")[2]
  console.log(location.pathname)
  console.log(postId)
useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:8800/post/getpost/${postId}`);
      console.log(res)
      setPost(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  fetchData()
},[postId]);
async function handleDelete(){
  try {
    const res = await axios.delete(`http://localhost:8800/post/deletepost/${postId}`,{withCredentials: true});
    console.log(res)
    navigate("/home")
  } catch (err) {
    console.log(err);
  }

}
console.log(currentUser.currentUser.name)
console.log(currentUser.name)
console.log(post.User?.name)
console.log(post?.image)
if(post.User?.name===currentUser.name)
console.log("harpy")
else
{
  console.log("sharpie")
  console.log(typeof(currentUser.name))
  console.log(typeof(post.User?.name))

}
console.log("../../public/Upload")

  return (
   
    <div className="single">
      <div className="blogimage">
        <img src={`.././public/Upload/${post?.image}`} alt="disappearing"/>
       
       
      </div>
      <div className="blogwriter">
        <div className="bloggerimage">
          <img src={post.User?.img} />
          <div className="bloggerdetails">
            <p style={{ fontWeight: "bold" }}>{post.name}</p>
            <p>{moment(post.date).fromNow()} </p>
          </div>
          {/* {currentUser.currentUser.name===post.User?.name &&( */}
          <div className="editbuttons">
          <Link to={`/write?edit`} state={post}>
          <button id="editbutton">
              <ion-icon name="create-outline"></ion-icon>
            </button>
          </Link>
           
            <button id="deletebutton">
              <ion-icon name="trash-outline" onClick={handleDelete}></ion-icon>
            </button>
          </div>
          {/* )} */}
        </div>
        <div className="blogcontent"><h1>{post.title}</h1>
                <p>{post.desc}</p></div>
      </div>
    </div>
  );
}
