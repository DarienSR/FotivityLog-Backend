import React, { useState, useEffect } from 'react';
import axios from "axios";
import Line from './charts/Line';
import Heatmap from "./charts/Heatmap";
import Treemap from './charts/Treemap';
import 'react-calendar-heatmap/dist/styles.css';
export default function Graphs() {
  let [sessions, setSessions] = useState(null);
  let [refreshToken, setRefreshToken]= useState(false);
  let [data, setData] = useState([]);

  let getMinutes = function(start, end) { return Math.floor(((Math.abs(start  - end)) / 1000) / 60); } // hours


  
  // Check to see if there is an active session
  useEffect(() => {
    let url = `${process.env.REACT_APP_URL}session/all`;
    axios.get(url).then(function(response) {
      let topics = [], session_times = [];
      response.data.forEach((obj) => {
        topics.push(obj.topic.toUpperCase())
        
        session_times.push({
          date: obj.start_time.split('T')[0],
          count: getMinutes(new Date(obj.start_time), new Date(obj.end_time))
        })
        
      })

      setData({ topics, session_times });
      setSessions(response.data); // [0] is current Session
    }).catch(function(error) {
      console.log(error)
      alert("Error " + error.message + " | " + url)
    });
  }, [refreshToken]);


  return(
    <>
      <h1>Dashboard</h1>
      <Treemap data={data} />
      <Line sessions={sessions} data={ data } />
      <div style={{ width: '30%', padding: '1rem'}}>
      <Heatmap sessions={ data.session_times }  />
      </div>
    </>
  )
}


