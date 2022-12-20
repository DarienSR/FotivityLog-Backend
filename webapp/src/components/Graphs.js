import React, { useState, useEffect } from 'react';
import axios from "axios";

import Line from './charts/Line';
import Heatmap from "./charts/Heatmap";
import Treemap from './charts/Treemap';
export default function Graphs() {
  let [sessions, setSessions] = useState(null);
  let [refreshToken, setRefreshToken]= useState(false);
  let [days, setDays] = useState([]);
  let getDaysArray = function(s,e) {for(var a=[],d=new Date(s);d<=new Date(e);d.setDate(d.getDate()+1)){ a.push(new Date(d));}return a;};
  
  // Check to see if there is an active session
  useEffect(() => {
    let url = `${process.env.REACT_APP_URL}session/all`;
    axios.get(url).then(function(response) {
      console.log(response.data)
      setSessions(response.data); // [0] is current Session
      setDays(getDaysArray(response.data[0].start_time, response.data[response.data.length-1].start_time));
    }).catch(function(error) {
      console.log(error)
      alert("Error " + error.message + " | " + url)
    });
  }, [refreshToken]);

  console.log(days)

  return(
    <>
      <h1>Dashboard</h1>
      <Line sessions={sessions} />
      <Heatmap />
      <Treemap />
    </>
  )
}