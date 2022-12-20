import { useInput } from "../hooks/useInput";
import { useCheckbox } from "../hooks/useCheckbox";

import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Session from "./Session";

export default function Edit() {
  let [sessions, setSessions] = useState(null);
  let [refreshToken, setRefreshToken]= useState(false);


  function UpdateData() {
    setRefreshToken(!refreshToken);
  }

  // Check to see if there is an active session
  useEffect(() => {
    let url = `${process.env.REACT_APP_URL}session/all`;
    axios.get(url).then(function(response) {
      console.log(response.data)
      setSessions(response.data); // [0] is current Session
    }).catch(function(error) {
      console.log(error)
      alert("Error " + error.message + " | " + url)
    });
  }, [refreshToken]);

  function DeleteSession(id) {
    let url = `${process.env.REACT_APP_URL}session/delete/${id}`;
    axios.delete(url).then(function(response) {
      alert("Deleted")
      setRefreshToken(!refreshToken)
      UpdateData(); // refresh the data feed
    }).catch(function(error) {
      console.log(error)
      alert("Error " + error.message + " | " + url)
    });
  }

  return (
    <div>
      <div style={styles.edit}>
        <p stlye={styles.headers}>Start Time</p>
        <p stlye={styles.headers}>Topic/Desc</p>
        <p stlye={styles.headers}>End Time</p>
      </div>
      { sessions !== null ? sessions.map((session, key) => {
        return <Session key={key} UpdateData={UpdateData} Delete={DeleteSession} session={session} />
      }).reverse() : <p>No Sessions Found.</p>}
    </div>
  )
}

let styles = {
  edit: {
    display: 'flex',
    width: '40%',
    margin: '0 auto',
    justifyContent: 'space-between',
    padding: '0.25rem',
    fontWeight: 'bold',
    textDecoration: 'underline',
    fontSize: '1.5rem',
    
  }
}