import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/Auth";
import { routes } from "../_utils/Routes";

const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const auth = useAuth();
    const location = useLocation();
    const inLoginPage = location.pathname === '/login';
    const inRegisterPage = location.pathname === '/register'


    if ((inLoginPage || inRegisterPage) && auth.user) return <Navigate to={routes.Home} state={{ path: location.pathname }} />
    console.log("🚀 ~ auth.user:", auth.user)
    console.log(auth.token);

    console.log("🚀 ~ (inLoginPage || inRegisterPage):", (inLoginPage || inRegisterPage))
    console.log("🚀 ~ (inLoginPage || inRegisterPage) && auth.user:", (inLoginPage || inRegisterPage) && auth.user)
    if (!(inLoginPage || inRegisterPage) && !auth.user) return <Navigate to={routes.Login} state={{ path: location.pathname }} />

    return children;
}

export default RequireAuth;