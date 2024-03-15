import { useNavigate, useSearchParams } from "react-router-dom";

import { toast } from "react-toastify";

import jwt_decode from "jwt-decode";

import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const ActivateBuyer = () => {
    const { t } = useTranslation();

    const [error, setError] = useState("");
    const [queryParameters] = useSearchParams();
    const navigate = useNavigate();

    const activation = async () => {
        await axios
            .get(
                `${
                    import.meta.env.VITE_BACKEND_URL
                }/api/account/buyer/email-verify/?token=${queryParameters?.get("token")}`,
            )
            .then((res) => {
                toast.success(res.data?.success);
            })
            .catch((err) => {
                setError(err.response?.data.error);
            });

        return;
    };

    useEffect(() => {
        activation();

        error == "" ? navigate("/account/login") : toast.error(error);
    }, []);

    const resendActivation = async () => {
        const user_id = jwt_decode(queryParameters?.get("token"))?.user_id;

        await axios
            .post(
                `${
                    import.meta.env.VITE_BACKEND_URL
                }/api/account/buyer/email-verify-refresh/`,
                user_id,
                { headers: { "Content-Type": "application/json" } },
            )
            .then((res) => {
                if (res.status === 200) {
                    toast.success(`${t("buyer_pages.activate_buyer.activate_success")}!`);
                }
            });
    };

    return (
        <main>
            <section className="py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="text-center">
                                {error === "Activation link expired!" && (
                                    <>
                                        <h3
                                            className="fw-bold"
                                            style={{ color: "#3a0ca3" }}
                                        >
                                            {t("buyer_pages.activate_buyer.resend")}
                                        </h3>
                                        <div className="mt-5">
                                            <button
                                                onClick={resendActivation}
                                                className="border-0 gradient-bg-color p-3 px-5 text-white fw-bold rounded shadow"
                                            >
                                                {t(
                                                    "buyer_pages.activate_buyer.resend_btn",
                                                )}
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default ActivateBuyer;
