import { Link, useNavigate } from "react-router-dom";

import { TfiEmail } from "react-icons/tfi";
import { RiLockPasswordLine, RiLoginCircleLine } from "react-icons/ri";

import BreadCrumb from "../../components/Buyer/shared/BreadCrumb";

import AuthContext from "../../context/AuthContext";
import { useContext, useEffect } from "react";

import loginVideo from "../../assets/videos/login.mp4";
import { useTranslation } from "react-i18next";

const Login = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const { loginUser, user } = useContext(AuthContext);

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const rememberMe = e.target.rememberMe.checked;

        email.length > 0 && loginUser(email, password, rememberMe);
    };

    return (
        <main>
            <section className="py-4">
                <div className="container">
                    <div className="row">
                        <BreadCrumb title={`${t("login")}`} />
                    </div>
                    <div className="row mt-5">
                        <div className="col-12 col-md-6">
                            <video
                                className="login__video"
                                autoPlay
                                muted
                                preload="auto"
                                loop
                                playsInline
                            >
                                <source
                                    src={loginVideo}
                                    type="video/mp4"
                                />
                            </video>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="d-flex justify-content-center align-items-center">
                                <div className="card login__card rounded-3">
                                    <div className="card-body">
                                        <h3 className="card-title login__title">
                                            {t("login")}
                                        </h3>
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
                                                <div className="mb-4">
                                                    <label
                                                        htmlFor="password"
                                                        className="form-label d-flex align-items-center gap-2 login__form-label"
                                                    >
                                                        <RiLockPasswordLine size="1.4rem" />
                                                        {t("password")}
                                                    </label>
                                                    <input
                                                        type="password"
                                                        name="password"
                                                        className="form-control"
                                                        placeholder="••••••••••••"
                                                        required
                                                    />
                                                </div>
                                                <div className="mb-4 row px-2">
                                                    <div className="col-6">
                                                        <div
                                                            className="form-check"
                                                            style={{
                                                                maxWidth: "max-content",
                                                            }}
                                                        >
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                name="rememberMe"
                                                                id="rememberMe"
                                                            />
                                                            <label
                                                                className="form-check-label english"
                                                                htmlFor="rememberMe"
                                                            >
                                                                {t("remember")}
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="col-6 text-end">
                                                        <Link to="/account/password/reset">
                                                            {t("forgot")}?
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="my-4">
                                                    <button
                                                        type="submit"
                                                        className="gradient-bg-color w-100 py-2 text-white rounded shadow fw-bold login__btn d-flex align-items-center gap-2 justify-content-center"
                                                    >
                                                        {t("login")}
                                                        <RiLoginCircleLine size="1.4rem" />
                                                    </button>
                                                </div>
                                                <div className="text-center d-flex align-items-center gap-1">
                                                    {t("no_account")}
                                                    <Link to="/account/register">
                                                        {t("here")}
                                                    </Link>
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

export default Login;
