import React from 'react';
import { FiAlertTriangle } from "react-icons/fi";

class Error extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
 
            <div>  
                <FiAlertTriangle/> 
            </div>

        );
    }
}
export default Error;

