import React, { useContext } from "react";

import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const useAuth = () => {
    const { user } = useContext(AuthContext);

    if (user) {
        return true;
    } else {
        return false;
    }
};

const BuyerProtectedRoutes = () => {
    const auth = useAuth();

    return auth ? <Outlet /> : <Navigate to="/account/login" />;
};

export default BuyerProtectedRoutes;
