import { useState } from "react";
import axios from "axios"
import "./LoginForm.css";
//We have not added proxy as ahown in 1h:15
export default function SignupForm() {
  const[inputs,setInputs]=useState({
    name:"",
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
    const res=await axios.post("http://localhost:8800/auth/signup",inputs)
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
          data-bs-target="#signupModal"
        >
          Signup
        </button>

        <div
          className="modal fade"
          id="signupModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Signup
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                {/* <SignupForm /> */}
                <form className="myform">
                  <div className="mb-3">
                    <label for="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="name"
                      className="form-control"
                      id="name"
                      name="name"
                      aria-describedby="nameHelp"
                    onChange={handleChange}/>
                  </div>
                  <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      aria-describedby="emailHelp"
                      onChange={handleChange}/>
                  </div>
                  <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      onChange={handleChange}/>
                  </div>
                  <div className="mb-3">
                    <label for="profilepic" className="form-label">
                      Profile Pic
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="profilepic"
                    />
                  </div>
                  <div className="buttonclass">
                    <button type="submit" id="submit" className="btn btn-primary" onClick={handleSubmit}>
                      Signup
                    </button>
                    
                  </div>
                  {error && <p>{error}</p>}
                </form>
              </div>
              <div className="modal-footer"></div>
            </div>
          </div>
        </div>
      
    </>
  );
}
