import React from 'react';

class BarChart extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { value } = this.props;

        var classVal = `w-[${value}%]`;


        return (
            <div className="box h-full col-span-2" >
                <h1 className='pb-4' >Metas</h1>
                <div>
                    <p className='text-xs'>Vas por un {value}%</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 ">
                        <div className={`bg-green-500 h-2.5 rounded-full ${classVal}`} ></div>
                    </div>
                </div>
            </div>

        );
    }
}
export default BarChart;