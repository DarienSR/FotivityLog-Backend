import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
export default function Navbar(props) {

  const { state, pathname } = useLocation();
  let navigate = useNavigate();

  let isLoggedOn;
  
  if(state === null) isLoggedOn = <>
    <p onClick={() => props.toggleRender("Login")} style={ styles.text }>Login</p> 
    <p onClick={() => props.toggleRender("Sign Up")} style={styles.text}>Sign Up</p>
  </>
  else {
    isLoggedOn = <>
      <p style={ styles.text }>{ state.username }</p> 
      <p style={ styles.text }>Logout</p>
    </> 
  }

  return (
    <>
    <div style={styles.nav}>
      <div style={styles.components}>
        <img title="View Graphs" onClick={() => props.toggleRender("Graph")} alt="Navigate to Graph Page" style={styles.image} src="./graph.png" />
        <img title="Add Sessions" onClick={() => props.toggleRender("Add")} alt="Navigate to Add Session Page" style={styles.image} src="./add.png" />
        <img title="Edit Sessions" onClick={() => props.toggleRender("Edit")} alt="Navigate to Edit Session Page" style={styles.image} src="./edit.png" />
      </div>
      <div style={styles.auth}>
        { isLoggedOn }       
      </div>
    </div>
    </>
  )
}

const styles = {
  nav: {
    height: "5rem",
    marginBottom: "2rem",
    borderBottom: '3px solid #eaeaea',
    boxShadow: '2px 1px #d3c9c9',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  image: {
    height: '50px',
    width: '50px',
    margin: '0rem 2rem',
    paddingTop: 15,
    cursor: "pointer",
  },
  text: {
    height: '50px',
    width: '70px',
    margin: '0rem 2rem',
    paddingTop: 15,
    cursor: "pointer",
    alignSelf: 'flex-end',
  },
  components: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '60%',
  },
  auth: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '40%',
  }
}