import React from 'react';
import Chart from "react-apexcharts";
import Error from '../Error';

class PieChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            res: false,
            loading: true,
            data: [],
            error: false
        }
    }

    render() {
        // var { title, currentValue, totalValue, porcent } = this.props;
        var series = [44, 55, 41, 17, 15, 15, 23, 55, 29, 37, 12, 7, 3];
        var options = {
            chart: {
                type: 'donut',
            },
            legend: {
                show: false,
                position: 'right'
            },
            dataLabels: {
                enabled: false
            },
            plotOptions: {
                pie: {
                    donut: {
                        size: '60%',
                        labels: {
                            show: true,
                            name: {
                                show: true,
                                fontSize: '8px',
                                fontFamily: 'Helvetica, Arial, sans-serif',
                                fontWeight: 600,
                                color: undefined,
                                offsetY: -5,
                                formatter: function (val) {
                                    return  val
                                }
                            },
                            value: {
                                show: true,
                                fontSize: '13px',
                                fontFamily: 'Helvetica, Arial, sans-serif',
                                fontWeight: 400,
                                color: undefined,
                                offsetY: 0,
                                formatter: function (val) {
                                    return '%' + val
                                }
                            },
                            total: {
                                show: true,
                                showAlways: false,
                                label: 'Total',
                                fontSize: '13px',
                                fontFamily: 'Helvetica, Arial, sans-serif',
                                fontWeight: 400,
                                color: '#373d3f',
                                formatter: function (w) {
                                    return '%' + w.globals.seriesTotals.reduce((a, b) => {
                                        return a + b
                                    }, 0)
                                }
                            }
                        }
                    }
                }
            },
            
        };

        return (
            <div className='bg-white w-full rounded-lg p-4'>

                <div className=' flex justify-between'>
                    <Chart
                        options={options}
                        series={series}
                        type="donut"
                        width={180}
                        height={200}
                    />

                </div>
            </div>

        );
    }
}
export default PieChart;