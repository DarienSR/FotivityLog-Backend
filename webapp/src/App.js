import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import Graphs from "./components/Graphs"
import Navbar from './components/Navbar';
import Add from './components/Add';
import Edit from './components/Edit';
import Signup from './components/authentication/Signup';
import Login from "./components/authentication/Login";
function App() {
  let [display, setDisplay] = useState(null); // display is going to hold a component


  function ToggleRender(component) {
   if(component === "Graph") setDisplay(<Graphs />); 
   if(component === "Add") setDisplay(<Add />); 
   if(component === "Edit") setDisplay(<Edit />); 
   if(component === "Login") setDisplay(<Login />);
   if(component === "Sign Up") setDisplay(<Signup />);
   
  }

  useEffect(() => {
    ToggleRender("Graph");
  }, []);

  return (
    <div className="App">
      <Navbar toggleRender={ToggleRender} />
      { display }
    </div>
  );
}

export default App;
