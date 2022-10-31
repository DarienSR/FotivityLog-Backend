import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import Graphs from "./components/Graphs"
import Navbar from './components/Navbar';
import Add from './components/Add';
import Edit from './components/Edit';
function App() {
  let [display, setDisplay] = useState(null); // display is going to hold a component


  function ToggleRender(component) {
   console.log(component)
   if(component === "Graph") setDisplay(<Graphs />); 
   if(component === "Add") setDisplay(<Add />); 
   if(component === "Edit") setDisplay(<Edit />); 
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
