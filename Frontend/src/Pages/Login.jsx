import "./Login.css"

import React, { useState,useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext.jsx";


const Login = () => {
  const [inputs, setInputs] = useState({
    name: "",
    password: "",
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();
  const {login}=useContext(AuthContext)
  const {currentUser}=useContext(AuthContext)

 console.log(currentUser)


  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res=await login(inputs)
        console.log(res)
      navigate("/home");
    } catch (err) {
      console.log(err)
      setError(err.response.data.message);
    }
  };
  return (
    <div className="auth">
      <h1>Login</h1>
      <form>
        <input
          required
          type="text"
          placeholder="username"
          name="name"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Login</button>
        {err && <p>{err}</p>}
        <span>
          Don't you have an account? <Link to="/">Register</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;