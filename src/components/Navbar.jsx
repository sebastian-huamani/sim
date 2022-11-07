import { NavLink } from "react-router-dom";
import { FaHome, FaUser, FaFileContract, FaAddressCard, FaClone } from "react-icons/fa";
import { AiFillSetting } from "react-icons/ai";
import { HiLogout } from "react-icons/hi";

export default function Navbar(props) {

    return (
        <div className={`nav-lateral show`}>
            <ul className="grid grid-flow-row gap-8 text-center text-2xl" >
                <li className="mb-6">
                    <FaClone />
                </li>
                <hr />
                <li>
                    <NavLink
                        className={({ isActive }) => (isActive ? "text-red-700" : "")}
                        to="/Dashboard/home">
                        <FaHome />
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className={({ isActive }) => (isActive ? "text-red-700" : "")}
                        to="/Dashboard/perfil">
                        <FaUser />
                    </NavLink>
                </li>
                <hr className="bg-slate-600 w-full" />
                <li>
                    <NavLink
                        className={({ isActive }) => (isActive ? "text-red-700" : "")}
                        to='/Dashboard/templates' >
                        <FaFileContract />
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        className={({ isActive }) => (isActive ? "text-red-700" : "")}
                        to='/Dashboard/tarjetas' >
                        <FaAddressCard />
                    </NavLink>
                </li>
                <hr className="bg-slate-600 w-full" />
                <li>
                    <NavLink
                        className={({ isActive }) => (isActive ? "text-red-700" : "")}
                        to='/Dashboard/settings' >
                        <AiFillSetting />
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className={({ isActive }) => (isActive ? "text-red-700" : "")}
                        to='/Dashboard/logout' >
                        <HiLogout />
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}
