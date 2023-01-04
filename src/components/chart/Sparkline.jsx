import React from 'react';
import Chart from "react-apexcharts";

class Sparkline extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            series: [{
                data: [31, 40, 28, 51, 42, 109, 100]
            }],
            options: {
                chart: {
                    type: 'area',
                    sparkline: {
                        enabled: true
                    },
                },
                stroke: {
                    curve: 'straight'
                },
                fill: {
                    opacity: 0.3,
                },
                yaxis: {
                    min: 0
                },
                title: {
                    text: '$424,652',
                },
            },
        }
    }

    render() {
        const { options, series } = this.state;
        const classNames = `sparkline h-full ${this.props.className}`;

        
        return (
            <div className={classNames}>
                <Chart
                    options={options}
                    series={series}
                    type="area"
                    width="100%"
                    height="100%"
                />
            </div>
        );
    }
}
export default Sparkline;