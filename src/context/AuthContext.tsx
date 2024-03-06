import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import axios from "axios";

import { useTranslation } from "react-i18next";

const baseURL = import.meta.env.VITE_BACKEND_URL;

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens"))
            : sessionStorage.getItem("authTokens")
            ? JSON.parse(sessionStorage.getItem("authTokens"))
            : null
    );

    const [user, setUser] = useState(() =>
        localStorage.getItem("authTokens")
            ? jwt_decode(localStorage.getItem("authTokens"))
            : sessionStorage.getItem("authTokens")
            ? jwt_decode(sessionStorage.getItem("authTokens"))
            : null
    );

    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const { t } = useTranslation();

    const loginUser = async (email, password, rememberMe) => {
        await axios
            .post(
                baseURL + "/api/account/login/",
                {
                    email,
                    password,
                },
                {
                    "Content-Type": "application/json",
                }
            )
            .then((res) => {
                const data = res.data;
                setAuthTokens(data);
                setUser(jwt_decode(data.access));

                if (rememberMe === true) {
                    localStorage.setItem("authTokens", JSON.stringify(data));
                } else {
                    sessionStorage.setItem("authTokens", JSON.stringify(data));
                }

                if (jwt_decode(data.access).role === "supplier") {
                    navigate("/supplier/dashboard");
                } else {
                    navigate("/");
                }

                toast.success(`${t("auth_context.login_successful")}!`);

                return res.data;
            })
            .catch((err) => {
                toast.error(`${t("auth_context.login_failed")}.`);
            })
            .then(async (res) => {
                if (jwt_decode(res.access).role === "buyer") {
                    const wishlistArray = [];

                    await axios
                        .get(baseURL + "/api/wishlist/", {
                            headers: {
                                Authorization: `Bearer ${res.access}`,
                            },
                        })
                        .then((res) => {
                            res.data.map((item) => {
                                wishlistArray.push(item.product);
                            });
                            localStorage.setItem(
                                "wishlist",
                                JSON.stringify(wishlistArray)
                            );
                        });
                }
                return;
            });
    };

    const registerBuyer = async (
        email,
        full_name,
        phone,
        shipping_address,
        profile_picture,
        password,
        setEmail,
        setFullName,
        setPhone,
        setPostalCode,
        setAddress1,
        setAddress2,
        pictureRef,
        setPassword,
        setConfirmPassword
    ) => {
        let formData = new FormData();
        formData.append("email", email);
        formData.append("full_name", full_name);
        formData.append("phone", phone);
        formData.append("shipping_address", JSON.stringify(shipping_address));
        formData.append("profile_picture", profile_picture);
        formData.append("password", password);
        formData.append("is_buyer", true);
        formData.append("is_supplier", false);

        await axios
            .post(baseURL + "/api/account/buyer/register/", formData, {
                "Content-Type": "multipart/form-data",
            })
            .then((res) => {
                if (res.status === 201) {
                    toast.success(
                        `${t("auth_context.buyer_register_successful")}.`
                    );
                    setEmail("");
                    setFullName("");
                    setPhone("+966");
                    setPostalCode("");
                    setAddress1("");
                    setAddress2("");
                    setPassword("");
                    setConfirmPassword("");

                    pictureRef.current.value = null;
                }
            })
            .catch((err) => {
                let errors = err.response.data;

                Object.keys(errors).forEach((key) => {
                    const args = errors[key];

                    args.forEach((arg) => {
                        toast.error(
                            `${key.charAt(0).toUpperCase()}${key
                                .slice(1)
                                .toLowerCase()}: ${arg
                                .charAt(0)
                                .toUpperCase()}${arg.slice(1).toLowerCase()}`
                        );
                    });
                });
            });
    };

    const registerSupplier = async (
        email,
        full_name,
        phone,
        shipping_address,
        profile_picture,
        password,
        setEmail,
        setFullName,
        setPhone,
        setPostalCode,
        setAddress1,
        setAddress2,
        pictureRef,
        setPassword,
        setConfirmPassword
    ) => {
        let formData = new FormData();
        formData.append("email", email);
        formData.append("full_name", full_name);
        formData.append("phone", phone);
        formData.append("shipping_address", JSON.stringify(shipping_address));
        formData.append("profile_picture", profile_picture);
        formData.append("password", password);
        formData.append("is_buyer", false);
        formData.append("is_supplier", true);

        await axios
            .post(baseURL + "/api/account/supplier/register/", formData, {
                "Content-Type": "multipart/form-data",
            })
            .then((res) => {
                if (res.status === 201) {
                    toast.success(
                        `${t("auth_context.buyer_register_successful")}!`
                    );
                    setEmail("");
                    setFullName("");
                    setPhone("+966");
                    setPostalCode("");
                    setAddress1("");
                    setAddress2("");
                    setPassword("");
                    setConfirmPassword("");

                    pictureRef.current.value = null;
                }
            })
            .catch((err) => {
                let errors = err.response.data;

                Object.keys(errors).forEach((key) => {
                    const args = errors[key];

                    args.forEach((arg) => {
                        toast.error(
                            `${key.charAt(0).toUpperCase()}${key
                                .slice(1)
                                .toLowerCase()}: ${arg
                                .charAt(0)
                                .toUpperCase()}${arg.slice(1).toLowerCase()}`
                        );
                    });
                });
            });
    };

    const logoutUser = async () => {
        navigate("/");

        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem("authTokens");
        localStorage.removeItem("cartItems");
        sessionStorage.removeItem("authTokens");
        localStorage.removeItem("wishlist");
        toast.info(`${t("auth_context.logout_message")}!`);
    };

    const contextData = {
        user,
        setUser,
        authTokens,
        setAuthTokens,
        registerBuyer,
        registerSupplier,
        loginUser,
        logoutUser,
    };

    useEffect(() => {
        if (authTokens) {
            setUser(jwt_decode(authTokens.access));
        }
        setLoading(false);
    }, [authTokens, loading]);

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};
