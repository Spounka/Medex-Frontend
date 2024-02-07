import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import PermissionDenied from "../pages/shared/PermissionDenied";

const useAuth = () => {
    const { user } = useContext(AuthContext);

    if (user) {
        if (user.role === "buyer") {
            return true;
        }
    }

    return false;
};

const hasPermission = (requiredGroups = []) => {
    const { user } = useContext(AuthContext);

    const isUserInRequiredGroup = requiredGroups?.some((group) =>
        user?.group_names?.includes(group)
    );

    return isUserInRequiredGroup;
};

const BuyerProtectedRoutes = ({ requiredGroups }) => {
    const auth = useAuth();
    const permissionsGranted = hasPermission(requiredGroups);

    if (!auth) {
        return <Navigate to="/account/login" />;
    }

    if (!permissionsGranted) {
        return <PermissionDenied />;
    }

    return <Outlet />;
};

export default BuyerProtectedRoutes;
