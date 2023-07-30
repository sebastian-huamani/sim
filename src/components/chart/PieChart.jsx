import React from 'react';
import Chart from "react-apexcharts";
import Error from '../Error';
import BudgetInvest from '../BudgetInvest';

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


    componentDidMount() {
        let key = localStorage.getItem('key');

        fetch(`https://financemeapi.com/api/dataMonthTemplate/${this.props.date}/${this.props.type_card}`, {
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
            fetch(`https://financemeapi.com/api/dataMonthTemplate/${this.props.date}/${this.props.type_card}`, {
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
        var { title, currentValue, totalValue, porcent } = this.props;
        var { res, loading, error, data } = this.state;

        if (error) {
            return (
                <div className='bg-white w-full rounded-lg p-4 cursor-default'>
                    <Error />
                </div>
            );
        }


        if (loading) {
            return (
                <div className='bg-white w-full rounded-lg p-4 cursor-default '>
                    loading
                </div>
            );
        }
        
        var series = data[1];

        var options = {
            chart: {
                type: 'donut',
                offsetY: 0
            },
            labels: data[0],
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
                                offsetY: -3,
                                formatter: function (val) {
                                    return val
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
                                    return 'S/. ' + val
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
                                    return 'S/. ' + w.globals.seriesTotals.reduce((a, b) => {
                                        return a + b
                                    }, 0).toFixed(2)
                                }
                            }
                        }
                    }
                }
            },
            legend: {
                show: false
            },
        };


        if (this.props.type_card == 4 || this.props.type_card == 3) {
            return (
                <div className='bg-white w-full rounded-lg p-4 cursor-default'>

                    <div className='grid grid-cols-2'>
                        <div className='flex flex-col justify-between'>
                            <p className='text-sm'>{title}</p>
                            <div>
                                <p className='text-lg font-semibold'>$/ {data[2]}</p>
                            </div>
                            <div className='flex justify-between '>
                                <BudgetInvest value="33" />
                            </div>
                        </div>
                        <Chart
                            options={options}
                            series={series}
                            type="donut"
                            width={130}
                            height={160}
                        />

                    </div>
                </div>

            );
        }

        return (
            <div className='bg-white w-full rounded-lg p-4 cursor-default'>

                <div className='grid grid-cols-2'>
                    <div className='flex flex-col justify-between'>
                        <p className='text-sm'>{title}</p>
                        <div>
                            <p className='text-lg font-semibold'>$/ {data[3]}</p>
                            <p className='text-xs text-gray-400'>de $/ {data[2]}</p>
                        </div>
                        <div className='flex justify-between '>
                            <BudgetInvest value="33" />
                        </div>
                    </div>
                    <Chart
                        options={options}
                        series={series}
                        type="donut"
                        width={130}
                        height={160}
                    />

                </div>
            </div>

        );
    }
}
export default PieChart;