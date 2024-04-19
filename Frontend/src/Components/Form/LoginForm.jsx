import "./LoginForm.css";
import { useState } from "react";
import SignupForm from "./SignupForm";
export default function LoginForm() {
  const[inputs,setInputs]=useState({
    email:"",
    password:"",
  })
  const[error,setError]=useState("")
  const handleChange=e=>{
    setInputs(prev=>({...prev,[e.target.name]:e.target.value}))
    console.log(e.target)
  }
  const handleSubmit=async e=>{
    e.preventDefault()
    try{
      const res=await axios.post("http://localhost:8800/auth/login",inputs)
    }
   catch(err){
    console.log(err)
    setError(err.response.data)
  
   }
    
   }
  return (
  
    <>
      

      <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#loginModal"
        >
          Login
        </button>

        <div
          className="modal fade"
          id="loginModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Login
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                {/* <LoginForm /> */}
                <form className="myform">
                  <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      onChange={handleChange}
                      name="email"
                    />
                  </div>
                  <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                      onChange={handleChange}
                      name="password"
                    />
                  </div>
                  <div className="buttonclass">
                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                      Login
                    </button>
                    {/* <button type="submit" className="btn btn-primary">
            Signup
          </button> */}
                  </div>
                </form>
              </div>
              <div className="modal-footer"></div>
            </div>
          </div>
        </div>
    </>
  );
}
