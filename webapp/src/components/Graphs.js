import React, { useState, useEffect } from 'react';
import axios from "axios";
import CalendarHeatmap from 'react-calendar-heatmap'; // https://www.npmjs.com/package/react-calendar-heatmap
import Line from './charts/Line';
import Heatmap from "./charts/Heatmap";
import Treemap from './charts/Treemap';
import 'react-calendar-heatmap/dist/styles.css';
export default function Graphs() {
  let [sessions, setSessions] = useState(null);
  let [refreshToken, setRefreshToken]= useState(false);
  let [data, setData] = useState([]);

  let getMinutes = function(start, end) { return Math.abs(start  - end) / 1000 / 60 / 60};


  
  // Check to see if there is an active session
  useEffect(() => {
    let url = `${process.env.REACT_APP_URL}session/all`;
    axios.get(url).then(function(response) {
      let topics = [], startDates = [], session_lengths = [];
      response.data.forEach((obj) => {
        topics.push(obj.topic.toUpperCase())
        startDates.push(obj.start_time.split('T')[0])    
        session_lengths.push(getMinutes(new Date(obj.start_time), new Date(obj.end_time)))
      })

      setData({ topics, startDates, session_lengths });
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
      <div style={{ width: '30%', backgroundColor: 'red', padding: '1rem'}}>
      <Heatmap />
      </div>
    </>
  )
}


