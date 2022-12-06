import React from 'react';

import { FaChessKnight, FaChessRook, FaChessBishop } from "react-icons/fa";


class NotData extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(

            <div className='relative w-full min-h-98 h-full flex  justify-center items-center' > 
                <div className='text-9xl opacity-30'>
                    <FaChessBishop />
                <div className='text-sm text-center'>
                    {this.props.children}
                </div>
                </div>
            </div>

        );
    }
}
export default NotData;