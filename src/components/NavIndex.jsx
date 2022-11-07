import React from 'react';
import { NavLink } from 'react-router-dom';

class NavIndex extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (

            <div className='w-full flex items-center justify-between px-6 py-2 bg-white shadow-lg shadow-slate-500/20  '>
                <div>
                    FinanceMe
                </div>  

                <ul className='flex w-full justify-end'>
                    <li className='mx-8'>
                        <NavLink> Home </NavLink>
                    </li>
                    <li className='mx-8'>
                        <NavLink> About </NavLink>
                    </li>
                    <li className='mx-8'>
                        <NavLink> Blogs </NavLink>
                    </li>
                    <li className='mx-8'>
                        <NavLink> Session </NavLink>
                    </li>
                </ul>


            </div>

        );
    }
}
export default NavIndex;