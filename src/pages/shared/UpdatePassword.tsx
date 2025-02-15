import { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import {
    AiOutlineArrowLeft,
    AiOutlineArrowRight,
    AiOutlineLock,
    AiOutlineUnlock,
} from "react-icons/ai";
import { MdOutlineLockReset } from "react-icons/md";
import { TbLockCog, TbPasswordFingerprint } from "react-icons/tb";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import BreadCrumb from "../../components/Buyer/shared/BreadCrumb";
import useAxios from "../../utils/useAxios";

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const UpdatePassword = () => {
    const { t, i18n } = useTranslation();

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword1, setNewPassword1] = useState("");
    const [newPassword2, setNewPassword2] = useState("");

    const api = useAxios();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const validatePassword = PASSWORD_REGEX.test(newPassword1);

        if (!validatePassword) {
            toast.error(`${t("buyer_pages.register.pass")}.`);
            return;
        }

        if (newPassword1 !== newPassword2) {
            toast.error(`${t("buyer_pages.register.pass_conf")}.`);
            return;
        }

        await api
            .put(import.meta.env.VITE_BACKEND_URL + "/api/account/update-password/", {
                current_password: oldPassword,
                new_password: newPassword1,
            })
            .then(() => {
                toast.success(t("shared.password_update.success"));

                setOldPassword("");
                setNewPassword1("");
                setNewPassword2("");
            })
            .catch((err) => {
                if (err?.response?.data?.error === "current") {
                    toast.error(t("shared.password_update.current_fail"));
                } else {
                    toast.error(t("shared.password_update.all_fail"));
                }
            });
    };

    return (
        <main className="w-100">
            <section
                className={`${window.location.href.indexOf("supplier") === -1 && "py-5"}`}
            >
                <div className="container">
                    <Link
                        to="../../account/dashboard/settings"
                        className="d-flex align-items-center"
                        style={{ color: "var(--theme-color-primary)" }}
                    >
                        {i18n.resolvedLanguage == "en" ? (
                            <AiOutlineArrowLeft className="mb-2" />
                        ) : (
                            <AiOutlineArrowRight className="mb-2" />
                        )}{" "}
                        <h5 className="fw-normal">{t("supplier_pages.settings.back")}</h5>{" "}
                    </Link>

                    {window.location.href.indexOf("supplier") > -1 ||
                    window.location.href.indexOf("dashboard") > -1 ? (
                        <h2 className="fw-bold d-flex align-items-center gap-2 dashboard__title">
                            <TbPasswordFingerprint size="2.5rem" />
                            {t("supplier_sidebar.password_update")}
                        </h2>
                    ) : (
                        <div className="row">
                            <BreadCrumb
                                title={`${t("supplier_sidebar.password_update")}`}
                            />
                        </div>
                    )}

                    <div className="row">
                        <div
                            className={`mt-5 col-12 px-4 ${
                                window.location.href.indexOf("supplier") === -1 &&
                                window.location.href.indexOf("dashboard") === -1
                                    ? "mx-auto"
                                    : "mt-4"
                            }`}
                        >
                            <form
                                method="post"
                                onSubmit={handleSubmit}
                            >
                                <div className="mb-3">
                                    <label
                                        htmlFor="old"
                                        className="form-label d-flex align-items-center gap-2"
                                    >
                                        <MdOutlineLockReset size="1.8rem" />
                                        {t("shared.password_update.old")}
                                    </label>
                                    <input
                                        type="password"
                                        name="old"
                                        className="form-control"
                                        placeholder="••••••••••••"
                                        required
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label
                                        htmlFor="new1"
                                        className="form-label d-flex align-items-center gap-2"
                                    >
                                        <AiOutlineUnlock size="1.8rem" />

                                        {t("shared.password_update.new1")}
                                    </label>
                                    <input
                                        type="password"
                                        name="new"
                                        className="form-control"
                                        placeholder="••••••••••••"
                                        required
                                        value={newPassword1}
                                        onChange={(e) => setNewPassword1(e.target.value)}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label
                                        htmlFor="new2"
                                        className="form-label d-flex align-items-center gap-2"
                                    >
                                        <AiOutlineLock size="1.8rem" />

                                        {t("shared.password_update.new2")}
                                    </label>
                                    <input
                                        type="password"
                                        name="new"
                                        className="form-control"
                                        placeholder="••••••••••••"
                                        required
                                        value={newPassword2}
                                        onChange={(e) => setNewPassword2(e.target.value)}
                                    />
                                </div>
                                <div className="my-5">
                                    <button
                                        type="submit"
                                        className="gradient-bg-color w-100 py-2 text-white rounded shadow fw-bold login__btn d-flex align-items-center gap-2 justify-content-center"
                                    >
                                        {t("shared.password_update.submit")}
                                        <TbLockCog size="1.5rem" />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default UpdatePassword;
