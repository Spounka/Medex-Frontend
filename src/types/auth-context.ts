import ResponseToken from "./storage-token.ts";
import { TempUser } from "./user.ts";

export interface DecodedUser {
    "token_type": string,
    "exp": number,
    "iat": number,
    "jti": string,
    "user_id": string,
    "full_name": string,
    "group_names": string[],
    "parent": boolean,
    "role": string,
    "profile_picture"?: string,

}

export default interface AuthContextType {
    user: DecodedUser | null,
    setUser: any,
    authTokens: ResponseToken,
    setAuthTokens: any,
    registerBuyer: (data: TempUser) => void,
    registerSupplier: (data: TempUser) => void,
    loginUser: (email: string, password: string, rememberMe: boolean) => Promise<void>,
    logoutUser: () => void

}
