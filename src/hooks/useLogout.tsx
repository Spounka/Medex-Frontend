import { useTranslation } from "react-i18next";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";
import useAuthToken from "./useAuthToken.tsx";
import useDecodeUserToken from "./useDecodeUserToken.tsx";

export default function useLogout() {
    const { setAuthTokens } = useAuthToken();
    const { setUser } = useDecodeUserToken();
    const { t } = useTranslation();

    let logout = () => {
        setAuthTokens({ access: "", refresh: "" });
        setUser(null);
        localStorage.removeItem("authTokens");
        localStorage.removeItem("cartItems");
        sessionStorage.removeItem("authTokens");
        localStorage.removeItem("wishlist");
        toast.info(`${t("auth_context.logout_message")}!`);
        // return redirect("/account/login/");
        window.location.href = "/";
    };

    return logout;
}
