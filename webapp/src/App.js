import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { Route, Routes, Link } from "react-router-dom";

import Dashboard from "./components/Dashboard"
import Navbar from './components/Navbar';
import AddSession from './components/AddSession';
import EditSession from './components/EditSession';
import Signup from './components/authentication/Signup';
import Login from "./components/authentication/Login";
import ResetPassword from "./components/authentication/ResetPassword";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
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
