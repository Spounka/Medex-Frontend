import React, { useContext } from "react";

import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const useAuth = () => {
    const { user } = useContext(AuthContext);

    if (user) {
        if (user.role === "supplier") {
            return true;
        }
    }
    return false;
};

const SupplierProtectedRoutes = () => {
    const auth = useAuth();

    return auth ? <Outlet /> : <Navigate to="/account/login" />;
};

export default SupplierProtectedRoutes;
