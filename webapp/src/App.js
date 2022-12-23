import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { Route, Routes, Link } from "react-router-dom";
import Graphs from "./components/Graphs"
import Navbar from './components/Navbar';
import Add from './components/Add';
import Edit from './components/Edit';
import Signup from './components/authentication/Signup';
import Login from "./components/authentication/Login";




function App() {

  let navigate = useNavigate();
  const { state } = useLocation();

  let [display, setDisplay] = useState(null); // display is going to hold a component
  let [userData, setUserData] = useState(null);


  function ToggleRender(component) {
   if(component === "Graph")  navigate("/dashboard", { state })
   if(component === "Add")  navigate("/add", { state })
   if(component === "Edit")  navigate("/edit", { state })
   if(component === "Login")  navigate("/login", { state })
   if(component === "Sign Up")  navigate("/signup", { state })
  }
  useEffect(() => {
    ToggleRender("Graph");
  }, []);

  return (
    <div className="App">
      <Navbar toggleRender={ToggleRender} userData={ userData }  />
      <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/dashboard" element={<Graphs />} />
          <Route exact path="/add" element={<Add />} />
          <Route exact path="/edit" element={<Edit />} />
        </Routes>
    </div>
  );
}

export default App;
