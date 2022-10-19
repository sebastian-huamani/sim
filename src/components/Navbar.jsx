import { NavLink } from "react-router-dom";
import { FaHome, FaUser, FaFileContract, FaAddressCard, FaClone } from "react-icons/fa";


export default function Navbar() {
    return (
        <div >
            <ul className="grid grid-flow-row gap-8 text-center text-2xl " >
                <li className="mb-6">
                    <FaClone />
                </li>
                <li>
                    <NavLink
                        className={({ isActive }) => (isActive ? "text-red-700" : "")}
                        to="/home">
                        <FaHome />
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className={({ isActive }) => (isActive ? "text-red-700" : "")}
                        to="/perfil">
                        <FaUser />
                    </NavLink>
                </li>
                <hr className="bg-slate-800 w-full" />
                <li>
                    <NavLink
                        className={({ isActive }) => (isActive ? "text-red-700" : "")}
                        to='/templates' >
                        <FaFileContract />
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        className={({ isActive }) => (isActive ? "text-red-700" : "")}
                        to='/tarjetas' >
                        <FaAddressCard />
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}
