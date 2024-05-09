import "./Home.css";
import axios from "axios";
import posts from "../assets/posts.js";
import { Link,useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
export default function Home() {
  const [posts, setPosts] = useState([]);
  const cat = useLocation().search
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/post/getposts/${cat}`);
        console.log(res)
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData()
  },[cat]);
  
  return (
    <div className="home">
      <div className="posts">
        {posts.map((post) => {
          console.log(post.image)
          return (
            <div className="post" key={post.id}>
              <div className="img">
              <img src={`.././public/Upload/${post?.image}`}alt="post image" />
              </div>
              <div className="content">
                <Link classname="link" to={`/post/${post.id}`}>
                  <h1>{post.title}</h1>
                  <p>{post.desc}</p>
                  <button>Read More</button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
