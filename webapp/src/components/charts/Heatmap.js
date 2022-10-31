import { React } from "react";
import Chart from "react-apexcharts";

export default function Heatmap() {
 
    let data = {
    
      series: [{
        name: 'Metric1',
        data: [10, 30, 10, 4]
      },
      {
        name: 'Metric2',
        data: [10, 30, 10, 4]
      },
      {
        name: 'Metric3',
        data: [10, 30, 10, 4]
      },
      {
        name: 'Metric4',
        data: [10, 30, 10, 4]
      },
      {
        name: 'Metric5',
        data: [10, 30, 10, 4]
      },
      {
        name: 'Metric6',
        data: [10, 30, 10, 4]
      },
      {
        name: 'Metric7',
        data: [10, 30, 10, 4]
      },
      {
        name: 'Metric8',
        data: [10, 30, 10, 4]
      },
      {
        name: 'Metric9',
        data: [10, 30, 10, 4]
      }
      ],
      options: {
        chart: {
          height: 350,
          type: 'heatmap',
        },
        dataLabels: {
          enabled: false
        },
        colors: ["#008FFB"],
        title: {
          text: 'HeatMap Chart (Single color)'
        },
      },
  }
  return <Chart options={data.options} series={data.series} type="heatmap" height={350} />
}

