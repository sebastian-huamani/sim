import React from 'react';
import Chart from "react-apexcharts";
import Moment from 'moment';

class TimeLineChart extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { inicio ,fin } = this.props;
    console.log(new Date());

    // console.log("inicio" ,Moment(inicio).format('YYYY-MM-DD'));
    // console.log("fin" ,Moment(fin).format('YYYY-MM-DD'));
    // console.log("now", Moment(inicio).format('YYYY-MM-DD'));

    var series = [
      {
        data: [
          {
            x: 'Inicio',
            y: [
              // new Date('2019-03-02').getTime(),
              // new Date('2019-03-04').getTime()
            ],
            goals: [
              {
                name: 'Inicio',
                value: new Date(Moment(inicio).format('YYYY-MM-DD')).getTime(),
                strokeColor: '#CD2F2A'
              }
            ]
          },
          {
            x: 'Prestamo',
            y: [
              new Date(Moment(inicio).format('YYYY-MM-DD')).getTime(),
              new Date().getTime()
            ]
          },
          {
            x: 'Fin',
            y: [
              // new Date('2019-03-02').getTime(),
              // new Date('2019-03-04').getTime()
            ],
            goals: [
              {
                name: 'Fin',
                value: new Date(Moment(fin).format('YYYY-MM-DD')).getTime(),
                strokeColor: '#CD2F2A',
              }
            ]
          },

        ]
      }
    ];

    var options = {
      chart: {
        type: 'rangeBar',
        zoom: {
          enabled: false
        },
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      xaxis: {
        type: 'datetime'
      },
    };

    return (
      <div>
        <Chart
          options={options}
          series={series}
          type="rangeBar"
          width="100%"
          height="100%"
        />
      </div>
    );

  }
}
export default TimeLineChart;