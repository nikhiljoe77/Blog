import { createContext, useState,useEffect } from "react";


import axios from "axios";
export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  

const login = async (inputs) => {
  const res = await axios.post("http://localhost:8800/auth/login", inputs, {
  withCredentials: true
});

  console.log(res);
  // console.log(res.data.token);
  // const token = res.data.token;
  // localStorage.setItem("token", token);
  setCurrentUser(res.data);
  {currentUser}
};
const logout = async (inputs) => {
  // const navigate=useNavigate()
  const res = await axios.post("http://localhost:8800/auth/logout", {},{withCredentials: true});
  console.log(res)
  setCurrentUser(null);
 
};
useEffect(() => {
  localStorage.setItem("user", JSON.stringify(currentUser));
}, [currentUser])
return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

