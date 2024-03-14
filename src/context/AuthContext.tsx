import { createContext, useState, useEffect, ReactNode } from "react";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import useAuthToken from "../hooks/useAuthToken.tsx";
import useDecodeUserToken from "../hooks/useDecodeUserToken.tsx";
import ResponseToken from "../types/storage-token.ts";
import AuthContextType, { DecodedUser } from "../types/auth-context.ts";
import useLogout from "../hooks/useLogout.tsx";
import { TempUser } from "../types/user.ts";
import useRegisterUser from "../hooks/useRegisterUser.tsx";
import { useLogin } from "../hooks/useLogin.tsx";

const AuthContext = createContext<AuthContextType>({
    user: null,
    authTokens: { access: "", refresh: "" },
    loginUser: (email: string, password: string, rememberMe: boolean) => {
        throw new Error("loginUser must be implemented");
    },
    logoutUser: () => {
        throw new Error("logoutUser must be implemented");
    },
    registerBuyer: (
        data: TempUser,
    ) => {
        throw new Error("registerUser must be implemented");
    },
    registerSupplier: (
        data: TempUser,
    ) => {
        throw new Error("registerUser must be implemented");
    },
    setAuthTokens: () => {
    },
    setUser: () => {
    },
});
export default AuthContext;


export const AuthProvider = ({ children }: { children: ReactNode }): ReactNode => {
    const { authTokens, setAuthTokens } = useAuthToken();

    const { user, setUser } = useDecodeUserToken();

    const [loading, setLoading] = useState<boolean>(true);

    const navigate = useNavigate();

    const { t } = useTranslation();
    const logout = useLogout();
    const registerUser = useRegisterUser();

    const loginUser = useLogin({ setAuthTokens, setUser, navigate, t });

    const registerBuyer = async (
        data: TempUser,
    ): Promise<void> => {
        return registerUser(data, false);
    };

    const registerSupplier = async (
        data: TempUser,
    ): Promise<void> => {
        return registerUser(data, true);
    };

    const contextData: {
        user: DecodedUser | null,
        setUser: any,
        authTokens: ResponseToken,
        setAuthTokens: any,
        registerBuyer: typeof registerBuyer,
        registerSupplier: typeof registerSupplier,
        loginUser: (email: string, password: string, rememberMe: boolean) => Promise<void>,
        logoutUser: typeof logout,
    } = {
        user,
        setUser,
        authTokens,
        setAuthTokens,
        registerBuyer,
        registerSupplier,
        loginUser,
        logoutUser: logout,
    };

    useEffect(() => {
        if (authTokens) {
            setUser(jwtDecode<DecodedUser>(authTokens.access));
        }
        setLoading(false);
    }, [authTokens, loading]);

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};