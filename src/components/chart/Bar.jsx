import React from 'react';
import Chart from "react-apexcharts";
import Error from '../Error';

class Bar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            res: false,
            loading: true,
            data: [],
            error: false
        }
        this.splitData = this.splitData.bind(this);
    }

    splitData(data) {
        var series = [];
        var options = [];
        data.forEach(elem => {
            series.push(parseFloat(elem[1]));
            options.push(elem[0]);
        });
        return [series, options];
    }

    componentDidMount() {
        let key = localStorage.getItem('key');

        fetch('https://financemeapi.com/api/transactions', {
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


    render() {
        const { res, loading, error, data } = this.state;

        if (error) {
            return (
                <div className='graphic-box w-full  flex justify-center items-center '>
                    <div className='text-7xl opacity-25'>
                        <Error />
                    </div>
                </div>
            );
        }

        if (loading) {
            return (
                <div className='graphic-box'>
                    <div className=' w-full h-full animate-pulse p-6 mx-auto flex flex-col justify-center items-center gap-3'>
                        <p className='bg-slate-200 border h-full w-full'></p>
                        <p className='bg-slate-200 border h-6 w-full'></p>
                    </div>
                </div>
            );  
        }


        const [dataSeries, dataOptions] = this.splitData(data)

        var series = [{
            data: dataSeries
        }];
        var options = {
            chart: {
                height: 350,
                type: 'bar',
            },
            plotOptions: {
                bar: {
                    borderRadius: 0,
                    dataLabels: {
                        position: 'top', // top, center, bottom
                    },
                }
            },
            dataLabels: {
                enabled: true,
                formatter: function (val) {
                    return "S/" + val;
                },
                offsetY: -20,
                style: {
                    fontSize: '12px',
                    colors: ["#304758"]
                }
            },
            xaxis: {
                labels: {
                    rotate: 0,
                    rotateAlways: false,
                    hideOverlappingLabels: false,
                    trim: true,
                    style: {
                        fontSize: '10px',

                    }
                },
                categories: dataOptions,
                position: 'center',
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                },
                crosshairs: {
                    fill: {
                        type: 'gradient',
                        gradient: {
                            colorFrom: '#D8E3F0',
                            colorTo: '#BED1E6',
                            stops: [0, 100],
                            opacityFrom: 0.4,
                            opacityTo: 0.5,
                        }
                    }
                },
                tooltip: {
                    enabled: true,
                }
            },
            yaxis: {
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false,
                },
                labels: {
                    show: false,
                    formatter: function (val) {
                        return "S/" + val;
                    }
                }

            },
        }

        return (
            <div className='graphic-box '>
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
export default Bar;