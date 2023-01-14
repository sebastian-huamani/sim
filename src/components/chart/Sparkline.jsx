import React from 'react';
import Chart from "react-apexcharts";

class Sparkline extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        // const { optionsData, seriesData } = this.state;
        const classNames = `sparkline h-full ${this.props.className}`;

        var options = {
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
            title: {
                text: this.props.amountData,
            },
            subtitle: {
                text: 'Sales',
                offsetX: 65,
                offsetY: 0,
                floating: true,
                
            }
        }

        var series = [{
            data: this.props.data
        }]

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