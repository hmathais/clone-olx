import { Navigate } from "react-router-dom";
import { isLogged } from "./helpers/AuthHandler";

export const RequiredAuth = ({ children }) => {
    const logged = isLogged();

    if(!logged){
        return <Navigate to='/signin'/>
    }

    return children
}