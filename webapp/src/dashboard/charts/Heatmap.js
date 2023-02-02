import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap'; // https://www.npmjs.com/package/react-calendar-heatmap
import 'react-calendar-heatmap/dist/styles.css';
import { GroupSameDayDifferences } from '../SessionProcessing';
const today = new Date();

export default function Heatmap(props) {
  if(props.sessions === undefined) return null;

  return (
    <>
      <h1>History of Session (minutes)</h1>
      <CalendarHeatmap
        startDate={shiftDate(today, -200)}
        endDate={today}
        values={GroupSameDayDifferences(props.sessions)}
        classForValue={value => {
          if (!value) {
            return 'color-empty';
          }
          if(value.difference <= 60) return 'color-scale-1'
          if(value.difference <= 120) return 'color-scale-2'
          if(value.difference <= 180) return 'color-scale-3'
          if(value.difference <= 240) return 'color-scale-4'
          if(value.difference <= 300) return 'color-scale-5'
          if(value.difference > 300) return 'color-scale-6'
        }}

        viewBox={"0 0 348 101"}

        titleForValue = {(value) => {
            if(value === null) return null;
            return `${ value.date } - ${ value.difference }`
          }
        }

        showWeekdayLabels={true}
        onClick={value => alert(`Clicked on value with difference: ${value.difference / 60} hours`)}
      />

      <div style={{display: 'flex', justifyContent:'center', width: '50%', margin: '0 auto'}}>
        <div style={{width: '16rem', backgroundColor: '#67ff49', fontSize: '2rem', color: 'black', fontWeight: 'bold'}}>{"< 1h"}</div>
        <div style={{width: '16rem', backgroundColor: '#28c45c', fontSize: '2rem', color: 'black', fontWeight: 'bold'}}>{"1h - 2h"}</div>
        <div style={{width: '16rem', backgroundColor: '#0d6836', fontSize: '2rem', color: 'black', fontWeight: 'bold'}}>{"2h - 3h"}</div>
      </div>

      <div style={{display: 'flex', justifyContent:'center', width: '50%', margin: '1rem auto'}}>
        <div style={{width: '16rem', backgroundColor: '#49b6ff', fontSize: '2rem', color: 'black', fontWeight: 'bold'}}>{"3h - 4h"}</div>
        <div style={{width: '16rem', backgroundColor: '#286cc4', fontSize: '2rem', color: 'black', fontWeight: 'bold'}}>{"4h - 5h"}</div>
        <div style={{width: '16rem', backgroundColor: '#104a81', fontSize: '2rem', color: 'black', fontWeight: 'bold'}}>{"5h+"}</div>
      </div>
    </>
  );
}

function shiftDate(date, numDays) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + numDays);
  return newDate;
}

