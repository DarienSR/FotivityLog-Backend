import React, { Component } from 'react';
import Chart from 'react-apexcharts'
function generateData() {

}
class ApexChart extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    
      series: [{
        name: 'Metric1',
        data: [20,30,10]
      },
      {
        name: 'Metric2',
        data: [49,34,72,56]
      },
      {
        name: 'Metric3',
        data: [43,67,49]
      },
      {
        name: 'Metric4',
        data: [1, 3]
      },
      {
        name: 'Metric5',
        data: [9,3,10,4]
      },
      {
        name: 'Metric6',
        data: [3]
      },
      {
        name: 'Metric7',
        data: [5,20]
      },
      {
        name: 'Metric8',
        data: [18,12,5]
      },
      {
        name: 'Metric9',
        data: [9,2,5]
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
    
    
    };
  }



  render() {
    return (
      

  <div id="chart">
  <Chart options={this.state.options} series={this.state.series} type="heatmap" height={350} />
  </div>
     );
    }
  }


  export default ApexChart;