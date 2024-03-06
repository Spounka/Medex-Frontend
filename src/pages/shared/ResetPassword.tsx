import { useState } from "react";

import { useNavigate, useSearchParams } from "react-router-dom";

import BreadCrumb from "../../components/Buyer/shared/BreadCrumb";

import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineLockReset } from "react-icons/md";

import { toast } from "react-toastify";

import axios from "axios";
import { useTranslation } from "react-i18next";

const PASSWORD_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const ResetPassword = () => {
    const { t } = useTranslation();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [queryParameters] = useSearchParams();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validatePassword = PASSWORD_REGEX.test(password);

        if (!validatePassword) {
            toast.error(`${t("buyer_pages.register.pass")}.`);
            return;
        }

        if (password !== confirmPassword) {
            toast.error(`${t("buyer_pages.register.pass_conf")}.`);
            return;
        }

        await axios
            .post(
                import.meta.env.VITE_BACKEND_URL +
                    `/api/account/password/reset/confirm?token=${queryParameters?.get(
                        "token"
                    )}`,
                { password },
                { "Content-Type": "application/json" }
            )
            .then(() => {
                navigate("/account/login");
                toast.success(`${t("shared.reset.success")}`);
            })
            .catch((err) => {
                toast.error(err);
            });
    };

    return (
        <main>
            <section className="py-5">
                <div className="container">
                    <div className="row">
                        <BreadCrumb title={`${t("shared.reset.title")}`} />
                    </div>
                    <div className="row mt-5">
                        <div className="col-12 col-md-6 mx-auto">
                            <div className="d-flex justify-content-center align-items-center">
                                <div className="card login__card shadow rounded-3">
                                    <div className="card-body">
                                        <h3 className="card-title login__title text-center">
                                            {t("shared.reset.title")}
                                        </h3>
                                        <div className="mt-5">
                                            <form
                                                method="post"
                                                onSubmit={handleSubmit}
                                            >
                                                <div className="mb-4">
                                                    <label
                                                        htmlFor="password"
                                                        className="form-label d-flex align-items-center gap-2 login__form-label"
                                                    >
                                                        <RiLockPasswordLine size="1.4rem" />
                                                        {t("shared.reset.new")}{" "}
                                                        *
                                                    </label>
                                                    <input
                                                        type="password"
                                                        name="password"
                                                        className="form-control"
                                                        placeholder="••••••••••••"
                                                        required
                                                        value={password}
                                                        onChange={(e) =>
                                                            setPassword(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="mb-4">
                                                    <label
                                                        htmlFor="confirm-password"
                                                        className="form-label d-flex align-items-center gap-2 login__form-label"
                                                    >
                                                        <RiLockPasswordLine size="1.4rem" />
                                                        {t("shared.reset.new2")}{" "}
                                                        *
                                                    </label>
                                                    <input
                                                        type="password"
                                                        name="confirm-password"
                                                        className="form-control"
                                                        placeholder="••••••••••••"
                                                        required
                                                        value={confirmPassword}
                                                        onChange={(e) =>
                                                            setConfirmPassword(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>

                                                <div className="my-4">
                                                    <button
                                                        type="submit"
                                                        className="gradient-bg-color w-100 py-2 text-white rounded shadow fw-bold login__btn d-flex align-items-center gap-2 justify-content-center"
                                                    >
                                                        {t(
                                                            "shared.reset.submit"
                                                        )}
                                                        <MdOutlineLockReset size="1.4rem" />
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default ResetPassword;
