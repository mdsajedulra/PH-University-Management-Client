import { ReactNode } from "react";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentToken } from "../../redux/store";
import { Navigate } from "react-router-dom";

const Protectedroute = ({children}: {children: ReactNode}) => {
    const token = useAppSelector(useCurrentToken);
    if(!token){
        return <Navigate to="/login" replace={true}></Navigate>
    }
    return children
};

export default Protectedroute;