import React from 'react';
import Chart from "react-apexcharts";
import CardContext from "../context/CardContext";

class CardChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      optionsCategories: [],
      seriesData: []
    });
  }

  render() {
    // const { seriesArr, OptionsArr } = this.context;
    var seriesArr = this.context.seriesArr;
    var OptionsArr = this.context.OptionsArr;
    var series = [{
      name: 'Cash Flow',
      data: seriesArr
    }];

    var options = {
      chart: {
        type: 'line',
        zoom: {
          enabled: false
        },
        toolbar: {
          show: true,
          // offsetX: '100%',
        }
      },
      plotOptions: {
        bar: {
          colors: {
            ranges: [{
              from: -100000,
              to: -100,
              color: '#F15B46'
            }, {
              from: -100,
              to: 0,
              color: '#FEB019'
            }]
          },
          columnWidth: '80%',
        }
      },
      dataLabels: {
        enabled: false,
      },
      yaxis: {
        decimalsInFloat: 0,
        forceNiceScale : true,
        opposite: true,
        labels: {
          formatter: function (y) {
            return "S/. " + y;
          }
        }
      },
      xaxis: {
        type: 'datetime',
        categories: OptionsArr,
        labels: {
          rotate: -90
        },
        tickPlacement: 'between'
      },
      tooltip: {
        followCursor: true,
      }

    }


    if (options.lenth == 0 || series.lenth == 0) {
      return (
        <div>
          none
        </div>
      )
    }

    // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    return (
      <div id="chart" className='h-full'>
        <Chart
          options={options}
          series={series}
          type="bar"
          width="100%"
          height="100%"
        />
      </div>
    );
  }
}

CardChart.contextType = CardContext;
export default CardChart;
