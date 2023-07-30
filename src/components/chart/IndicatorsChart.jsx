import React from 'react';
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
import { BsInfoCircleFill } from "react-icons/bs";


class 
IndicatorsChart extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var { data, name, title, loading, error } = this.props;

        if (data == 'undefined' || data == null) {
            data = [0, 0];
            return (
                <div className='IndicatorsChart relative'>
                    <p className='text-xs font-medium'> {name} </p>
                    <div className='text-center my-2'>
                        <div>
                            <p className='text-2xl h-8 bg-slate-200 rounded w-14 mx-auto my-0.5'>  </p>
                            <p className='text-sm  h-4 bg-slate-200 rounded w-12 mx-auto'> </p>
                        </div>

                        <p className='text-xs h-4 bg-slate-200 rounded mx-auto mt-0.5'></p>
                        <div className='absolute right-1 bottom-1 text-sm'>
                            <BsInfoCircleFill title={title} />
                        </div>
                    </div>
                </div>
            );
        }

 


        return (

            <div className='IndicatorsChart relative'>
                <p className='text-xs font-medium '> {name} </p>
                <div className='text-center my-2'>
                    <div>
                        <p className='text-2xl'> {data[0]} </p>
                        {data[1] >= 0 ?
                            <p className='text-sm flex items-center justify-center text-green-600'> {data[1]}%  <TiArrowSortedUp /> </p>
                            :
                            <p className='text-sm flex items-center justify-center text-red-600'> {data[1]}% <TiArrowSortedDown /> </p>
                        }
                    </div>

                    <p className='text-xs'>vs last month</p>
                    <div className='absolute right-1 bottom-1 text-sm'>
                        <BsInfoCircleFill title={title} />
                    </div>
                </div>
            </div>

        );
    }
}
export default IndicatorsChart;