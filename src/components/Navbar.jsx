import { NavLink, Navigate } from "react-router-dom";
import { FaHome, FaUser, FaFileContract, FaAddressCard, FaClone } from "react-icons/fa";
import { AiFillSetting } from "react-icons/ai";
import { HiLogout } from "react-icons/hi";


import React from 'react';

class Navbar extends React.Component{
    constructor(props){
        super(props);
        this.state = ({
            done : false
        })
        this.onClickLogout = this.onClickLogout.bind(this);
    }

    onClickLogout(){
        let key = localStorage.getItem('key');
        const fetchPromise = fetch("http://127.0.0.1:8000/api/logout", {
            method: 'POST',
                // 'mode': 'cors',
            'headers': {
                'Content-Type': 'text/plain',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + key,
            }
        });

        fetchPromise.then(response => {
            return response.json();
        }).then(res => {
            this.setState({
                done: true,
            });
        });
        localStorage.clear();
        sessionStorage.clear();
    }

    render(){
        const { onClickLogout } = this;
        var { done }  = this.state

        if( done ){
            return <Navigate to={"/login"} />
        }

        return (
            <div className='nav-lateral show'>
                <ul className="grid grid-flow-row gap-8 text-center text-2xl" >
                    <li className="mb-6">
                        <FaClone />
                    </li>
                    <hr />
                    <li>
                        <NavLink
                            className={({ isActive }) => (isActive ? "text-slate-600" : "bg-black")}
                            to="/Dashboard/home">
                            <FaHome />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={({ isActive }) => (isActive ? "text-slate-600" : "bg-black")}
                            to="/Dashboard/perfil">
                            <FaUser />
                        </NavLink>
                    </li>
                    <hr className="bg-slate-600 w-full" />
                    <li>
                        <NavLink
                            className={({ isActive }) => (isActive ? "text-slate-600" : "bg-black")}
                            to='/Dashboard/templates' >
                            <FaFileContract />
                        </NavLink>
                    </li>
    
                    <li>
                        <NavLink
                            className={({ isActive }) => (isActive ? "text-slate-600" : "bg-black")}
                            to='/Dashboard/tarjetas' >
                            <FaAddressCard />
                        </NavLink>
                    </li>
                    <hr className="bg-slate-600 w-full" />
                    <li>
                        <NavLink
                            className={({ isActive }) => (isActive ? "text-slate-600" : "bg-black")}
                            to='/Dashboard/settings' >
                            <AiFillSetting />
                        </NavLink>
                    </li>
                    <li>
                        <button onClick={onClickLogout} className={({ isActive }) => (isActive ? "text-slate-600" : "bg-black")}>
                            <HiLogout />
                        </button>
                    </li>
                </ul>
            </div>
        )
    }
}
export default Navbar;
