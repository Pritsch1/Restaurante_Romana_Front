import { Navigate, Outlet } from 'react-router-dom'

export default function Protect() {

    let isAuthenticated = localStorage.getItem("isLogged");
    //console.log(isAuthenticated);

    return (isAuthenticated === "false" ? <Navigate to="/adm_signin" /> : <Outlet />)
}