import React from 'react';
import { NavLink } from 'react-router-dom';

class NavIndex extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (

            <div className='w-full flex items-center justify-between px-6 py-2 bg-white shadow-lg shadow-slate-500/20  '>
                <div className='w-2/6'>
                    Finance<span className='text-lime-600 font-bold'>Me</span> 
                </div>  

                <ul className='w-full sm:w-3/6 md:w-2/6 pl-20 grid grid-cols-3 justify-end'>
                    <li className=''>
                        <NavLink className={({ isActive }) => (isActive ? "text-lime-600" : "")} to="/Home"> Home </NavLink>
                    </li>
                    {/* <li className=''>
                        <NavLink> About </NavLink>
                    </li> */}
                    <li className=''>
                        <NavLink className={({ isActive }) => (isActive ? "text-lime-600" : "")} to="/Blog"> Blogs </NavLink>
                    </li>
                    <li className=''>
                        <NavLink className={({ isActive }) => (isActive ? "text-lime-600" : "")} to="/Login"> Session </NavLink>
                    </li>
                </ul>


            </div>

        );
    }
}
export default NavIndex;