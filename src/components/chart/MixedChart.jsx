import React from 'react';
import Chart from "react-apexcharts";
import Error from '../Error';

class MixedChart extends React.Component {
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

        fetch('https://financemeapi.com/api/dataMonth', {
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

    ProcesingData(data) {
        var fullCredit = [];
        var aviableCredit = [];
        var fullDebit = [];
        var aviableDebit = [];
        var dates = []

        if (data == null || data == 'undefined') {
            return [fullCredit, aviableCredit, fullDebit, aviableDebit];
        }

        data.map((item) => {
            fullCredit.push(item.full_credit)
            aviableCredit.push(item.aviable_credit)
            fullDebit.push(item.full_debit)
            aviableDebit.push(item.aviable_debit)
            dates.push(item.created_at.split('-', 2).join('-'))
        });

        return [fullCredit, aviableCredit, fullDebit, aviableDebit, dates];

    }

    render() {
        const { res, loading, data, error } = this.state;
        var { title } = this.props;
        var [fullCredit, aviableCredit, fullDebit, aviableDebit, dates] = this.ProcesingData(data);

        var series = [{
            name: 'Credito Total',
            data: fullCredit
        }, {
            name: 'Credito Disponible',
            data: aviableCredit
        }, {
            name: 'Debito Total',
            data: fullDebit
        }, {
            name: 'Debito Disponible',
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
                    sizeOffset: 3
                }
            },
            xaxis: {
                type: 'datetime',
                categories: dates,
                tickPlacement: 'between',
                labels: {
                    style: {
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
                    style: {
                        fontSize: '11px',
                    }
                },
            },

            grid: {
                borderColor: '#f1f1f1',
            }
        }

        if (error) {
            return (
                <div className='graphic-box col-span-2 '>
                    <div className='flex items-center justify-center h-full text-7xl opacity-25'>
                        <Error />
                    </div>
                </div>
            );
        }

        if (loading) {
            return (
                <div className='graphic-box col-span-2 '>
                    <div className='animate-pulse h-full py-2 px-2 flex flex-col'>
                        <p className=' bg-slate-200 rounded h-6 mb-2 w-1/5'> </p>
                        <div className='h-full w-full bg-slate-200 rounded'></div>
                    </div>
                </div>
            );
        }

        return (
            <div className='graphic-box col-span-2 '>
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