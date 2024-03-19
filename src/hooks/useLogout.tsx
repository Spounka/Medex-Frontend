import { useNavigate } from "react-router-dom";
import useAuthToken from "./useAuthToken.tsx";
import useDecodeUserToken from "./useDecodeUserToken.tsx";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export default function useLogout() {
    const navigate = useNavigate();

    const { setAuthTokens } = useAuthToken();
    const { setUser } = useDecodeUserToken();
    const { t } = useTranslation();

    return () => {
        navigate("/");
        setAuthTokens({ access: "", refresh: "" });
        setUser(null);
        localStorage.removeItem("authTokens");
        localStorage.removeItem("cartItems");
        sessionStorage.removeItem("authTokens");
        localStorage.removeItem("wishlist");
        toast.info(`${t("auth_context.logout_message")}!`);
    };
}
