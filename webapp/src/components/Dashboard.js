import React, { useState, useEffect } from 'react';
import axios from "axios";
import Heatmap from "./charts/Heatmap";
import Treemap from './charts/Treemap';
import 'react-calendar-heatmap/dist/styles.css';
import { useNavigate, useLocation } from "react-router-dom";
import Alert from "./Alert";
export default function Dashboard() {
  const { state } = useLocation();
  let navigate = useNavigate();
  let [data, setData] = useState([]);
  let [alert, setAlert] = useState("");
  let [alertIsVisible, setAlertIsVisible] = useState(false);
  let [alertError, setAlertError] = useState(false)

  let getMinutes = function(start, end) { return Math.floor(((Math.abs(start  - end)) / 1000) / 60); } // hours
  // Check to see if there is an active session
  useEffect(() => {
    if(state !== null) {
      let url = `${process.env.REACT_APP_URL}session/all/${state.id}`;
      axios.get(url).then(function(response) {
        let topics = [], session_times = [], locations = [];
        response.data.forEach((obj) => {
          topics.push(obj.topic.toUpperCase())
          session_times.push({
            date: obj.start_time.split('T')[0],
            count: getMinutes(new Date(obj.start_time), new Date(obj.end_time))
          })
          locations.push(obj.location)
          console.log(obj)
        })

        setData({ topics, session_times, locations });
        
      }).catch(function(error) {
        alert("Error " + error.message + " | " + url)
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
        <div style={{ ...styles.component, ...styles.large }}>
          <Heatmap sessions={ data.session_times }  />
        </div>
        <div style={ styles.component }>
          <Treemap data={ data.locations } title="Locations" />
        </div>
      </div>

      <div style={ styles.dashboardContainer }>
        <div style={{ ...styles.component, ...styles.large }}>
          <Treemap data={ data.topics } title="Topics" />
        </div>
      </div>
    </>
  )
}


let styles = {
  dashboardContainer: {
    backgroundColor: 'white',
    padding: '1rem',
    display: 'flex',
    flexDirection: 'row',
  },
  component: {
    padding: '1rem',
    backgroundColor: 'white',
    margin: '0.25rem',
    width: '40%',
    borderRadius: '2%',
    border: '2px solid #dfdede',
    boxShadow: '2px 3px whitesmoke'
  },
  small: {
    width: '40%',
  },
  medium: {
    width: '70%',
  },
  large: {
    width: '100%',
  }
}