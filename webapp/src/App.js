import './App.css';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { Route, Routes, Link } from "react-router-dom";

import Dashboard from "./dashboard/Dashboard"
import Navbar from './common/Navbar';
import AddSession from './sessions/AddSession';
import EditSession from './sessions/EditSession';
import Signup from './authentication/Signup';
import Login from "./authentication/Login";
import ResetPassword from "./authentication/ResetPassword";


let content = <h1>Home Page</h1>

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
          <Route exact path="/" element={ content } />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/add" element={<AddSession />} />
          <Route exact path="/edit" element={<EditSession />} />
          <Route exact path="/resetpassword" element={<ResetPassword />} />
        </Routes>
    </div>
  );
}

export default App;
