import React from 'react';
import Navbar from "../../components/Navbar";
import NavTop from "../../components/NavTop";

class NotFoundDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
        const idCard= e.target.getAttribute("id");
    }

    render() {
        return (
            <div className='md:pl-20 pl-0 '>
            <Navbar />
            <NavTop />
    
            <div className='grid grid-cols-template gap-4 h-screen p-2 '>
              Not Found
            </div>
    
          </div>
        );
    }
}

export default NotFoundDashboard;