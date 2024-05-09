import "./Navbar.css";
import logo from "../../assets/logo.jpg";

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import LoginForm from "../Form/LoginForm";
import SignupForm from "../Form/SignupForm";
import { AuthContext } from "../../context/authContext";

export default function Navbar() {
  const navigate=useNavigate()
  const { currentUser,logout } = useContext(AuthContext);
  const [menu, setMenu] = useState("shop");
  function handlelogout(){
    logout()
    navigate("/login")

  }
  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo}></img>
        <p>BLOGGER</p>
      </div>
      <ul className="nav-menu">
        {/* <li onClick={() => setMenu("/")}>
          <Link to="/home">HOME</Link>
          {menu == "home" ? <hr /> : <></>}
        </li> */}
        <li onClick={() => setMenu("tech")}>
          <Link to="/home/?cat=tech">TECH</Link>
          {menu == "tech" ? <hr /> : <></>}
        </li>
        <li onClick={() => setMenu("cinema")}>
          <Link to="/home/?cat=cinema">CINEMA</Link>
          {menu == "cinema" ? <hr /> : <></>}
        </li>
        <li onClick={() => setMenu("food")}>
          <Link to="/home/?cat=food">FOOD</Link>
          {menu == "food" ? <hr /> : <></>}
        </li>
      </ul>
      <div className="nav-login-cart">
        {/* <Link to="/login"><button>Login</button></Link> */}
        {/* <LoginForm />
        <SignupForm /> */}
        <span id="identity">Hi {currentUser?.name}</span>
      {currentUser?(<span onClick={handlelogout}>Logout</span>):(<Link className="link" link to="/login">Login</Link>)}
        <button type="button" id="writebutton" className="btn btn-primary">
          <Link to="/write">Write</Link>
        </button>
      </div>
    </div>
  );
}
