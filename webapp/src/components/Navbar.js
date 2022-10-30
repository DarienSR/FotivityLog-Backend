import React, { useState, useEffect } from 'react';

export default function Navbar(props) {
  return (
    <div style={styles.nav}>
      <img title="View Graphs" onClick={() => props.toggleRender("Graph")} alt="Navigate to Graph Page" style={styles.image} src="./graph.png" />
      <img title="Add Sessions" onClick={() => props.toggleRender("Add")} alt="Navigate to Add Session Page" style={styles.image} src="./add.png" />
      <img title="Edit Sessions" onClick={() => props.toggleRender("Edit")} alt="Navigate to Edit Session Page" style={styles.image} src="./edit.png" />
    </div>
  )
}

const styles = {
  nav: {
    height: "5rem",
    marginBottom: "2rem",
    borderBottom: '3px solid #eaeaea',
    boxShadow: '2px 1px #d3c9c9',
  },
  image: {
    height: '50px',
    width: '50px',
    margin: '0rem 2rem',
    paddingTop: 15,
    cursor: "pointer",
  }
}