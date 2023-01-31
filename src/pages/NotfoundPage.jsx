import React from 'react';
import NavIndex from "../components/NavIndex";

class NotfoundPage extends React.Component {
    constructor(props) {
        super(props);
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
export default NotfoundPage;