import React from 'react';
import { NavLink } from 'react-router-dom';

class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (

            <footer className='mt-10 bg-black text-wheat h-18 p-3 w-full '>
                <div className='sm:w-3/5 md:w-4/5 h-full mx-auto grid grid-cols-5 justify-around items-center text-center'>
                    <NavLink to="/Home" className="hover:">Home</NavLink>
                    <NavLink to="/Blog">Blog</NavLink>
                    <NavLink to="/Login">Login</NavLink>
                    <NavLink to="/Register">Register</NavLink>
                    <NavLink to="/Contact">Contacto</NavLink>
                </div>
            </footer>

        );
    }
}
export default Footer;