import { NavLink, Navigate } from "react-router-dom";
import { FaHome, FaUser, FaFileContract, FaAddressCard, FaClone, FaList } from "react-icons/fa";
import { AiFillSetting } from "react-icons/ai";
import { HiLogout } from "react-icons/hi";


import React from 'react';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            done: false
        })
        this.onClickLogout = this.onClickLogout.bind(this);
    }

    onClickLogout() {
        let key = localStorage.getItem('key');
        const fetchPromise = fetch("https://financemeapi.com/api/logout", {
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

    render() {
        const { onClickLogout } = this;
        var { done } = this.state

        if (done) {
            return <Navigate to={"/Login"} />
        }

        return (
            <div className='nav-lateral show'>
                <ul className="grid grid-flow-row gap-8 text-center text-2xl" >
                    <li className="mb-6">
                        <NavLink to="/Home" title="Home">
                            <FaClone />
                        </NavLink>
                    </li>
                    <hr />
                    <li>
                        <NavLink
                            className={({ isActive }) => (isActive ? "text-slate-600" : "bg-black")}
                            to="/Dashboard/Home" title="Home">
                            <FaHome />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={({ isActive }) => (isActive ? "text-slate-600" : "bg-black")}
                            to="/Dashboard/Perfil" title="Perfil">
                            <FaUser />
                        </NavLink>
                    </li>
                    <hr className="bg-slate-600 w-full" />
                    <li>
                        <NavLink
                            className={({ isActive }) => (isActive ? "text-slate-600" : "bg-black")}
                            to='/Dashboard/Templates' title="Plantillas">
                            <FaFileContract />
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            className={({ isActive }) => (isActive ? "text-slate-600" : "bg-black")}
                            to='/Dashboard/Tarjetas' title="Tarjetas">
                            <FaAddressCard />
                        </NavLink>
                    </li>

                    <hr className="bg-slate-600 w-full" />
                    <li>
                        <NavLink
                            className={({ isActive }) => (isActive ? "text-slate-600" : "bg-black")}
                            to='/Dashboard/Settings' title="Configuracion">
                            <AiFillSetting />
                        </NavLink>
                    </li>
                    <li>
                        <button type="submit" title="exit" onClick={onClickLogout} className={({ isActive }) => (isActive ? "text-slate-600" : "bg-black")} aria-label="Close" aria-details="test">
                            <HiLogout />
                        </button>
                    </li>
                </ul>
            </div>
        )
    }
}
export default Navbar;
