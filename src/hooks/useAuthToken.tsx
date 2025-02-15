import { useState } from "react";
import ResponseToken from "../types/storage-token.ts";
import useStorageTokens from "./useStorageTokens.tsx";

function useAuthToken() {
    const [localStorageToken, sessionStorageToken] = useStorageTokens();

    const [authTokens, setAuthTokens] = useState<ResponseToken>(() => {
        if (localStorageToken) return JSON.parse(localStorageToken);
        if (sessionStorageToken) return JSON.parse(sessionStorageToken);
        if (import.meta.env.DEV) console.warn("User unknown");
        return null;
    });
    return { authTokens, setAuthTokens };
}

export default useAuthToken;
