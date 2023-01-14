import React from 'react';
import Chart from "react-apexcharts";

class MixedChart extends React.Component {
    constructor(props) {
        super(props);
    }


    ProcesingData(data) {
        var fullCredit = [];
        var aviableCredit = [];
        var fullDebit = [];
        var aviableDebit = [];

        if (data == null || data == 'undefined') {
           return [fullCredit, aviableCredit, fullDebit, aviableDebit];
        }

        data.map((item) => {
            fullCredit.push(item.full_credit)
            aviableCredit.push(item.aviable_credit)
            fullDebit.push(item.full_debit)
            aviableDebit.push(item.aviable_debit)
        });

        return [fullCredit, aviableCredit, fullDebit, aviableDebit];

    }

    render() {

        var { data, title } = this.props;
        var [fullCredit, aviableCredit, fullDebit, aviableDebit] = this.ProcesingData(data);


        var series = [{
            name: 'fullCredit',
            data: fullCredit
        }, {
            name: 'aviableCredit',
            data: aviableCredit
        }, {
            name: 'fullDebit',
            data: fullDebit
        }, {
            name: 'aviableDebit',
            data: aviableDebit
        }];

        var options = {
            chart: {
                type: 'line',
                zoom: {
                    enabled: false
                },
            },

            dataLabels: {
                enabled: false
            },
            stroke: {
                width: [3, 2, 3, 2],
                curve: 'smooth',
            },
            title: {
                text: title,
                align: 'left',
                style: {
                    fontSize: '11px',
                    floating: true,
                }

            },
            legend: {
                position: 'top',
                floating: true,
                offsetY: 0,
                fontSize: '11px',
            },
            markers: {
                size: 2,
                hover: {
                    sizeOffset: 4
                }
            },
            xaxis: {
                type: 'datetime',
                categories: ["2023-01", "2023-02", "2023-03", "2023-04", "2023-05", "2023-06", "2023-07", "2023-08", "2023-09", "2023-10", "2023-11", "2023-12",
                ],
                tickPlacement: 'between',
                labels: {
                    style : {
                        fontSize: '11px',
                    }
                }
            },
            yaxis: {
                logBase: 2,
                labels: {
                    formatter: function (y) {
                        return "S/. " + y;
                    },
                    style : {
                        fontSize: '11px',
                    }
                },
            },
            
            grid: {
                borderColor: '#f1f1f1',
            }
        }

        return (
            <div className='graphic-box col-span-2'>
                <Chart
                    options={options}
                    series={series}
                    type="line"
                    width="100%"
                    height="100%"
                />
            </div>

        );
    }
}
export default MixedChart;