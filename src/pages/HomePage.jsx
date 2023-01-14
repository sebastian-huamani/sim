import React from 'react';
import NavIndex from "../components/NavIndex";


class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (

            <div className='h-screen'>
                <NavIndex />
                <div className='h-4/5 flex justify-center items-center'>
                    Home
                </div>
            </div>

        );
    }
}
export default HomePage;