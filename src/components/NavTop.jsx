import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";

export default function NavBar() {
    const [navbar, setNavbar] = useState(false);

    return (
        <nav className="inline-block md:hidden w-full  bg-white shadow rounded-b-xl ">
            <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
                <div>
                    <div className="flex items-center justify-between py-3 md:py-5 md:block">
                        <a href="javascript:void(0)">
                            <h2 className="text-2xl font-bold">LOGO</h2>
                        </a>
                        <div className="md:hidden">
                            <button
                                className="p-2  rounded-md outline-none focus:border-gray-400 focus:border"
                                onClick={() => setNavbar(!navbar)} >
                                <FaBars />
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <div className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${navbar ? "block" : "hidden"}`}  >

                        <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                            <li className="text-gray-600 hover:text-blue-600">
                                <NavLink
                                    className={({ isActive }) => (isActive ? "text-red-700" : "")}
                                    to="/home">
                                    Home
                                </NavLink>
                            </li>
                            <li className="text-gray-600 hover:text-blue-600">
                                <NavLink
                                    className={({ isActive }) => (isActive ? "text-red-700" : "")}
                                    to="/perfil">
                                    Perfil
                                </NavLink>
                            </li>
                            <li className="text-gray-600 hover:text-blue-600">
                                <NavLink
                                    className={({ isActive }) => (isActive ? "text-red-700" : "")}
                                    to='/templates' >
                                    Templates
                                </NavLink>
                            </li>
                            <li className="text-gray-600 hover:text-blue-600">
                                <NavLink
                                    className={({ isActive }) => (isActive ? "text-red-700" : "")}
                                    to='/tarjetas' >
                                    Tarjetas    
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </nav>
    );
}