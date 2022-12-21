import { React } from "react";
import Chart from "react-apexcharts";

export default function Treemap(props) {
  if(props.data.topics === undefined) return null;
  function mapWordCounts(words) {
    const counts = new Map();
    for (const word of words) { counts.set(word, (counts.get(word) ?? 0) + 1) }
    return counts;
  }

  let values = []
  mapWordCounts(props.data.topics).forEach((val, key) => {
    values.push({x: key, y: val})
  })

  let data = {
    series: [
      {
        data: values
      }
    ],
    options: {
      legend: {
        show: false
      },
      chart: {
        height: 350,
        type: 'treemap'
      },
      title: {
        text: 'Topic Breakdown',
      },
      dataLabels: {
        style: {
          colors: ['#5e5c56']
        }
      },
      plotOptions: {
        treemap: {
          colorScale: {
            ranges: [
              {
                from: 0,
                to: 5,
                color: '#d6e685'
              },
              {
                from: 5,
                to: 100,
                color: '#44a340'
              }
            ]
          }
        }
      }
    },
  };
  return <Chart options={data.options} series={data.series} type="treemap" height={350} />
}


    
