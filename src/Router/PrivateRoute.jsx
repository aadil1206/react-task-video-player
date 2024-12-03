import { Navigate , Outlet } from "react-router-dom";

const PrivateRoutes = ()=>{
    const token = localStorage.getItem('token');
    let auth = {'token' : token }
    return (
        auth.token !== null ? <Outlet/> : <Navigate to='/' />
    )
}

export default PrivateRoutes;