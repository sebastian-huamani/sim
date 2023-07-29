import React from 'react';
import Chart from "react-apexcharts";
import Error from '../Error';

class DataGeneral extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            res: false,
            loading: true,
            data: [],
            error: false
        }
    }

    componentDidMount() {
        let key = localStorage.getItem('key');

        fetch(`https://financemeapi.com/api/flowMoney/${this.props.date}`, {
            'headers': {
                method: 'GET',
                'Authorization': 'Bearer ' + key,
                'Content-Type': 'text/plain',
                'Accept': 'application/json',
            }
        }, [])
            .then(response => response.json())
            .then(res => {
                this.setState({
                    res: res['res'],
                    loading: res['res'] ? false : true,
                    error: res['res'] ? false : true,
                    data: res['msg'],
                });
            });
    }

    componentDidUpdate(prevProps) {
        let key = localStorage.getItem('key');
        if (this.props.date !== prevProps.date) {
            fetch(`https://financemeapi.com/api/flowMoney/${this.props.date}`, {
                'headers': {
                    method: 'GET',
                    'Authorization': 'Bearer ' + key,
                    'Content-Type': 'text/plain',
                    'Accept': 'application/json',
                }
            }, [])
                .then(response => response.json())
                .then(res => {
                    this.setState({
                        res: res['res'],
                        loading: res['res'] ? false : true,
                        error: res['res'] ? false : true,
                        data: res['msg'],
                    });
                });
        }
    }

    render() {
        var { money, date } = this.props;
        var { res, loading, error, data } = this.state;

        var series = data;

        var options = {
            chart: {
                type: 'area',
                height: 350,
                toolbar: {
                    show: true
                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth',
                width: 2.5,
            },
            xaxis: {
                labels: {
                    show: true,
                },
                type: 'datetime',
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                }
            },
            yaxis: {
                tickAmount: 4,
                floating: false,
                labels: {
                    show: false
                },
            },
            fill: {
                opacity: 0.5
            },
            legend: {
                show: true
            },
            tooltip: {
                x: {
                    format: "yyyy-MM-dd",
                },
                fixed: {
                    enabled: false,
                    position: 'topRight'
                }
            },
            grid: {
                yaxis: {
                    lines: {
                        offsetX: -30
                    }
                },
                padding: {
                    left: 10
                }
            }
        };

        return (
            <div className=' rounded-lg'>
                <Chart
                    options={options}
                    series={series}
                    type="area"
                    height={260}
                    width="100%"
                />
            </div>

        );
    }
}
export default DataGeneral;