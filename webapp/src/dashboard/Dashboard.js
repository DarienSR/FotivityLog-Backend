import React, { useState, useEffect } from 'react';
import axios from "axios";
import Heatmap from "./charts/Heatmap";
import Treemap from './charts/Treemap';
import 'react-calendar-heatmap/dist/styles.css';
import { useNavigate, useLocation } from "react-router-dom";
import Alert from "../common/Alert";

import "./SessionProcessing"; // imports all functions from file
import { ProcessSessionData } from './SessionProcessing';

export default function Dashboard() {
  const { state } = useLocation();
  let navigate = useNavigate();
  let [data, setData] = useState([]);
  let [alert, setAlert] = useState("");
  let [alertIsVisible, setAlertIsVisible] = useState(false);
  let [alertError, setAlertError] = useState(false)

  // Check to see if there is an active session
  useEffect(() => {
    if(state !== null) {
      let url = `${process.env.REACT_APP_URL}session/all/${state.id}`;
      axios.get(url).then(function(response) {
        let sessions = ProcessSessionData(response.data)
        setData( sessions );
      }).catch(function(error) {
       console.log("Error " + error.message + " | " + url)
      });
    } else {
      navigate("/login", { state })
    }
  }, []);

  return(
    <>
      <Alert alert={ setAlert } isVisible={ alertIsVisible } alertError={ alertError }/>
      <h1>Dashboard</h1>
      <div style={ styles.dashboardContainer }>
        <div style={{ ...styles.component, ...styles.large}}>
          <Heatmap sessions={ data.times }  />
        </div>
      </div>

      <div style={ styles.dashboardContainer }>
        <div style={ { ...styles.component, ...styles.medium } }>
          <Treemap data={ data.locations } title="Locations" />
        </div>
        <div style={{ ...styles.component, ...styles.medium }}>
          <Treemap data={ data.topics } title="Topics" />
        </div>
      </div>
    </>
  )
}

var list;
list = document.getElementsByClassName("react-calendar-heatmap");
for (let index = 0; index < list.length; ++index) {
    list[index].setAttribute("viewBox", "0 0 348 100");
}

let styles = {
  dashboardContainer: {
    padding: '1rem',
    display: 'flex',
    flexDirection: 'row',
  },
  component: {
    padding: '1rem',
    backgroundColor: '#fff4f469',
    margin: '0.25rem',
    width: '40%',
    borderRadius: '0.5%',
    border: '2px solid #dcd4d4',
    boxShadow: '2px 2px 3px 2px #dcd4d4'
  },
  small: {
    width: '25%',
  },
  medium: {
    width: '50%',
  },
  large: {
    width: '80%',
    margin: '0 auto'
  }
}