import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap'; // https://www.npmjs.com/package/react-calendar-heatmap
import 'react-calendar-heatmap/dist/styles.css';
import "../../App.css"

const today = new Date();

export default function Heatmap(props) {
  if(props.sessions === undefined) return null;
  return (
    <div>
      <h1>History of Session (minutes)</h1>
      <CalendarHeatmap
        startDate={shiftDate(today, -200)}
        endDate={today}
        values={props.sessions}
        classForValue={value => {
          if (!value) {
            return 'color-empty';
          }
          if(value.count >= 120) return 'color-scale-4'
          if(value.count >= 90) return 'color-scale-3'
          if(value.count >= 60) return 'color-scale-2'
          if(value.count >= 30) return 'color-scale-1'
          if(value.count >= 0) return 'color-scale-0'
       
        }}
        titleForValue={(value) => {
          if(value === null) return null;
          return `${ value.date } - ${ value.count }`
        }
        }

        showWeekdayLabels={true}
        onClick={value => alert(`Clicked on value with count: ${value.count}`)}
      />

    </div>
  );
}

function shiftDate(date, numDays) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + numDays);
  return newDate;
}

