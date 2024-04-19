import { useState } from "react";
import Home from "./Pages/Home.jsx";
import Single from "./Pages/Single.jsx";
import Write from "./Pages/Write.jsx";
import Navbar from "./Components/Navbar/Navbar.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import Register from "./Pages/Register.jsx";
import Login from "./Pages/Login.jsx";

import "./App.css";
import { BrowserRouter, Routes, Route,Outlet } from "react-router-dom";
function Layout({children}) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>
      
        <Route path="/home" element={<Layout><Home/></Layout>} />
        <Route path="/post/:id" element={<Layout><Single/></Layout>} />
        <Route path="/write" element={<Layout><Write/></Layout>} />
     
        <Route path="/" element={<Register/>} />
        <Route path="/login" element={<Login />} />
        
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
