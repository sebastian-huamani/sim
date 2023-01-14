import React from 'react';
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";

class IndicatorsChart extends React.Component{
    constructor(props){
        super(props);
    }
    
    render(){
        var { data , title} = this.props;

        if(data == 'undefined' || data == null) {
            data = [0, 0];
        }


        return(
 
            <div className='IndicatorsChart'> 
                <p className='text-xs font-medium '> {title} </p>
                <div className='text-center my-2'>
                    <div>
                        <p className='text-2xl'> {data[0]} </p>
                        { data[1] >= 0 ? 
                            <p className='text-sm flex items-center justify-center text-green-600'> {data[1]}%  <TiArrowSortedUp /> </p> 
                            :  
                            <p className='text-sm flex items-center justify-center text-red-600'> {data[1]}% <TiArrowSortedDown /> </p>
                        }
                    </div>
                    
                    <p className='text-xs'>vs last month</p>
                </div>
            </div>

        );
    }
}
export default IndicatorsChart;