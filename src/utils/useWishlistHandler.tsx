import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthContext from "../context/AuthContext";
import useAxios from "./useAxios";
import { useTranslation } from "react-i18next";

const useWishlistHandler = () => {
    const { t } = useTranslation();

    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const api = useAxios();

    const addToWishlist = (itemId) => {
        const storedWishlist = localStorage.getItem("wishlist") || "[]";
        const wishlistItems = JSON.parse(storedWishlist);

        if (!wishlistItems.includes(itemId)) {
            wishlistItems.push(itemId);
            localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
        }
    };

    const removeFromWishlist = (itemId, wish) => {
        if (wish === true) {
            document.getElementById(itemId).classList.add("d-none");
        }

        const storedWishlist = localStorage.getItem("wishlist") || "[]";
        const wishlistItems = JSON.parse(storedWishlist);

        const itemIndex = wishlistItems.indexOf(itemId);
        if (itemIndex !== -1) {
            wishlistItems.splice(itemIndex, 1);
            localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
        }
    };

    const handleWishlistClick = async (sku, wish) => {
        if (!user) {
            navigate(`/account/login`);
        } else {
            const storedWishlist = localStorage.getItem("wishlist") || "[]";
            const wishlistItems = JSON.parse(storedWishlist);

            if (wishlistItems.includes(sku)) {
                removeFromWishlist(sku, wish);
                try {
                    await api
                        .delete(
                            import.meta.env.VITE_BACKEND_URL +
                                `/api/wishlist/${sku}/`
                        )
                        .then(() => {
                            toast.success(
                                `${t("wishlist_context.remove_success")}!`
                            );
                        });
                } catch (error) {
                    toast.error(`${t("wishlist_context.remove_fail")}.`);
                }
            } else {
                addToWishlist(sku);
                try {
                    await api
                        .post(
                            import.meta.env.VITE_BACKEND_URL + "/api/wishlist/",
                            { sku: sku }
                        )
                        .then(() => {
                            toast.success(
                                `${t("wishlist_context.add_success")}!`
                            );
                        });
                } catch (error) {
                    toast.error(`${t("wishlist_context.add_fail")}.`);
                }
            }
        }
    };

    return handleWishlistClick;
};

export default useWishlistHandler;
