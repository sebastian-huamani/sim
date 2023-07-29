import React from 'react';
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";


class BudgetInvest extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        var { value, title } = this.props;

        if(value >= 0){
            return(
                <div className='bg-budget-chart rounded-lg p-1'>
                    <p className='cursor-default text-xs flex items-center justify-center text-green-700'>Feb: {value}%  <TiArrowSortedUp /> </p>
                </div>
            );
        }else {
            return(
                <p className='cursor-default text-xs flex items-center justify-center text-red-600'> {value}% <TiArrowSortedDown /> </p>
            );
        }


    }
}
export default BudgetInvest;