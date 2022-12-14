import React from 'react';
import NavIndex from "../components/NavIndex";

class Notfound extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
        const idCard= e.target.getAttribute("id");
        console.log(idCard);
        console.log(e.target);
    }

    render() {
        return (
            <div className='h-screen'>
            <NavIndex />
    
            <div className='grid grid-cols-template gap-4 h-screen p-2 '>
              Not Found
            </div>
    
          </div>
        );
    }
}
export default Notfound;