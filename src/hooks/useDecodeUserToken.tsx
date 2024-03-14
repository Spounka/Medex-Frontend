import { useState } from "react";
import jwtDecode from "jwt-decode";
import useStorageTokens from "./useStorageTokens.tsx";
import { DecodedUser } from "../types/auth-context.ts";

function useDecodeUserToken() {
    const [localStorageToken, sessionStorageToken] = useStorageTokens();

    const [user, setUser] = useState(() => {
        if (localStorageToken) {
            console.log("local decoded: ", jwtDecode(JSON.stringify(localStorageToken)));
            return jwtDecode<DecodedUser>(JSON.stringify(localStorageToken));
        }
        if (sessionStorageToken) {
            console.log("session decoded: ", jwtDecode(JSON.stringify(sessionStorageToken)));
            return jwtDecode<DecodedUser>(JSON.stringify(sessionStorageToken));
        }
        return null;
    });
    return { user, setUser };
}

export default useDecodeUserToken;

