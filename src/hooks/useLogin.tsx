import axios, { AxiosResponse } from "axios";
import ResponseToken from "../types/storage-token.ts";
import jwtDecode from "jwt-decode";
import { DecodedUser } from "../types/auth-context.ts";
import { toast } from "react-toastify";
import { Product } from "../types/product.ts";
import { NavigateFunction } from "react-router-dom";
import { TFunction } from "i18next";

interface Props {
    setAuthTokens: (
        value: ((prevState: ResponseToken) => ResponseToken) | ResponseToken,
    ) => void;
    setUser: (
        value:
            | ((prevState: DecodedUser | null) => DecodedUser | null)
            | DecodedUser
            | null,
    ) => void;
    navigate: NavigateFunction;
    t: TFunction<"translation", undefined>;
}

export function useLogin({ setAuthTokens, setUser, navigate, t }: Props) {
    const baseURL = import.meta.env.VITE_BACKEND_URL;
    return async (email: string, password: string, rememberMe: boolean) => {
        await axios
            .post(
                baseURL + "/api/account/login/",
                {
                    email,
                    password,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
            )
            .then((res: AxiosResponse<ResponseToken>) => {
                const data = res.data;
                setAuthTokens(data);
                setUser(jwtDecode(data.access));

                if (rememberMe) {
                    localStorage.setItem("authTokens", JSON.stringify(data));
                } else {
                    sessionStorage.setItem("authTokens", JSON.stringify(data));
                }

                if (jwtDecode<DecodedUser>(data.access).role === "supplier") {
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
                if (!res) return;
                if (jwtDecode<DecodedUser>(res.access).role === "buyer") {
                    const wishlistArray: Product[] = [];

                    await axios
                        .get(baseURL + "/api/wishlist/", {
                            headers: {
                                Authorization: `Bearer ${res.access}`,
                            },
                        })
                        .then((res: AxiosResponse<{ product: Product }[]>) => {
                            console.log(res);
                            res.data.map((item) => {
                                wishlistArray.push(item.product);
                            });
                            localStorage.setItem(
                                "wishlist",
                                JSON.stringify(wishlistArray),
                            );
                        });
                }
            });
    };
}
