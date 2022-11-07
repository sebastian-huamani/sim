import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ redirectTo="/login"}) => {

    let key = localStorage.getItem('key');
    if ( key == null || key === 'undefined'  ) {
        localStorage.removeItem('key');
        localStorage.removeItem('done');
        return <Navigate to={redirectTo} />
    }
    return <Outlet />
}
export default ProtectedRoute;