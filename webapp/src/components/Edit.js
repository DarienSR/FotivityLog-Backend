import { useInput } from "../hooks/useInput";
import { useCheckbox } from "../hooks/useCheckbox";

import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Session from "./Session";

export default function Edit() {
  let [sessions, setSessions] = useState(null);
  let [refreshToken, setRefreshToken]= useState(false);
  // Check to see if there is an active session
  useEffect(() => {
    let url = `https://studysessiontracker.herokuapp.com/session/all`;
    axios.get(url).then(function(response) {
      console.log(response.data)
      setSessions(response.data); // [0] is current Session
    }).catch(function(error) {
      console.log(error)
      alert("Error " + error.message + " | " + url)
    });
  }, [refreshToken]);

  function DeleteSession() {
    alert("Delete")
  }

  function EditSession() {
    // pop up modal
    alert("edit")
  }

  return (
    <div>
      <div style={styles.edit}>
        <p stlye={styles.headers}>Start Time</p>
        <p stlye={styles.headers}>Topic/Desc</p>
        <p stlye={styles.headers}>End Time</p>
      </div>
      { sessions !== null ? sessions.map((session) => {
        return <Session Delete={DeleteSession} Edit={EditSession} session={session} />
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
    fontSize: '1.5rem'
  }
}