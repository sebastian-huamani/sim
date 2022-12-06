import React from 'react';
import Navbar from "../../components/Navbar";
import NavTop from "../../components/NavTop";

class Transferencias extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='md:pl-20 pl-0'>
                <Navbar />
                <NavTop />
                <div className='sm:grid-modules-card text-justify h-screen p-2'>
                    Transferencias
                </div>
            </div>

        );
    }
}
export default Transferencias;