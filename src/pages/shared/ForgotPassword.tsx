import BreadCrumb from "../../components/Buyer/shared/BreadCrumb";

import { TfiEmail } from "react-icons/tfi";
import { RiMailSendLine } from "react-icons/ri";
import axios from "axios";

import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ForgotPassword = () => {
    const { t } = useTranslation();

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    if (user) {
        navigate("/");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios
            .post(
                import.meta.env.VITE_BACKEND_URL + "/api/account/password/reset/",
                { email: e.target.email.value },
                { "Content-Type": "application/json" },
            )
            .then(() => {
                toast.success(`${t("shared.forgot.success")}!`);
            })
            .catch((err) => {
                toast.error(err);
            });

        e.target.email.value = "";
    };

    return (
        <main>
            <section className="py-5">
                <div className="container">
                    <div className="row">
                        <BreadCrumb title={`${t("shared.forgot.title")}`} />
                    </div>
                    <div className="row mt-5">
                        <div className="col-12 col-md-6 mx-auto">
                            <div className="d-flex justify-content-center align-items-center">
                                <div className="card login__card rounded-3">
                                    <div className="card-body">
                                        <h3 className="card-title login__title text-center">
                                            {t("shared.forgot.title")}?
                                        </h3>
                                        <p className="text-muted text-center">
                                            {t("shared.forgot.info")}!
                                        </p>
                                        <div className="mt-5">
                                            <form
                                                method="post"
                                                onSubmit={handleSubmit}
                                            >
                                                <div className="mb-4">
                                                    <label
                                                        htmlFor="email"
                                                        className="form-label d-flex align-items-center gap-2 login__form-label"
                                                    >
                                                        <TfiEmail size="1.4rem" />
                                                        {t("email")}
                                                    </label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        className="form-control"
                                                        placeholder={`${t("email")}...`}
                                                        required
                                                    />
                                                </div>

                                                <div className="my-4">
                                                    <button
                                                        type="submit"
                                                        className="gradient-bg-color w-100 py-2 text-white rounded shadow fw-bold login__btn d-flex align-items-center gap-2 justify-content-center"
                                                    >
                                                        {t("shared.forgot.send")}
                                                        <RiMailSendLine size="1.4rem" />
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

export default ForgotPassword;
