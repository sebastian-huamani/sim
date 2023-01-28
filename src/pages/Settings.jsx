import React from 'react';
import Navbar from '../components/Navbar';

class Settings extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
 
            <div> 
                 <Navbar />
                 <div className='p-2 h-screen md:pl-20 pl-0 flex justify-center items-center text-2xl'>
                    Proximamente
                 </div>
            </div>

        );
    }
}
export default Settings;