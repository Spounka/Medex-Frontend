import { IoPersonCircleSharp, IoSettings } from "react-icons/io5";
import { TbPasswordFingerprint } from "react-icons/tb";
import { GoRepoForked } from "react-icons/go";
import { MdAttachMoney } from "react-icons/md";
import { FaBuilding } from "react-icons/fa";
import { Link } from "react-router-dom";

import { useTranslation } from "react-i18next";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

const Settings = () => {
    const { t } = useTranslation();
    const { user } = useContext(AuthContext);

    return (
        <main
            className="pt-3 pb-5 w-100"
            style={{ backgroundColor: "rgb(250, 250, 251)" }}
        >
            <section className="container-fluid">
                <h2 className="d-flex align-items-center gap-2 dashboard__title mt-2">
                    {t("buyer_sidebar.settings")}
                </h2>
                <div
                    className="p-4 row"
                    style={{ backgroundColor: "#fff" }}
                >
                    <Link
                        to="profile"
                        className="d-flex gap-2 col-12 col-md-3 mt-3"
                    >
                        <div className="settings-icon">
                            <IoSettings size={25} />
                        </div>
                        <div>
                            <h5 className="card-title mb-0 dashboard__stats-card-title">
                                {t("supplier_pages.settings.personal")}
                            </h5>
                            <p className="text-wrap desc">
                                {" "}
                                {user.role == "supplier"
                                    ? t("supplier_pages.settings.personalD")
                                    : t("supplier_pages.settings.personalD2")}
                            </p>
                        </div>
                    </Link>

                    <Link
                        to="password/update"
                        className="d-flex gap-2 col-12 col-md-3 mt-3"
                    >
                        <div className="settings-icon">
                            <TbPasswordFingerprint size={25} />
                        </div>
                        <div>
                            <h5 className="card-title mb-0 dashboard__stats-card-title">
                                {t("supplier_sidebar.password_update")}
                            </h5>
                            <p className="text-wrap desc">
                                {t("buyer_pages.settings.update_password_text")}
                            </p>
                        </div>
                    </Link>

                    <Link
                        to="permissions"
                        className="d-flex gap-2 col-12 col-md-3 mt-3"
                    >
                        <div className="settings-icon">
                            <IoPersonCircleSharp size={25} />
                        </div>
                        <div>
                            <h5 className="card-title mb-0 dashboard__stats-card-title">
                                {t("supplier_pages.settings.user&per")}
                            </h5>
                            <p className="text-wrap desc">
                                {t("supplier_pages.settings.user&per")}
                            </p>
                        </div>
                    </Link>

                    <Link
                        to="soon"
                        className="d-flex gap-2 col-12 col-md-3 mt-3"
                    >
                        <div className="settings-icon">
                            <GoRepoForked size={25} />
                        </div>
                        <div>
                            <h5 className="card-title mb-0 dashboard__stats-card-title">
                                {t("supplier_pages.settings.branch")}
                            </h5>
                            <p className="text-wrap desc">
                                {t("supplier_pages.settings.soon")}
                            </p>
                        </div>
                    </Link>

                    <Link
                        to="company"
                        className="d-flex gap-2 col-12 col-md-3 mt-3"
                    >
                        <div className="settings-icon">
                            <FaBuilding size={25} />
                        </div>
                        <div>
                            <h5 className="card-title mb-0 dashboard__stats-card-title">
                                {t("supplier_pages.settings.company")}
                            </h5>
                            <p className="text-wrap desc">
                                {t("supplier_pages.settings.companyD")}
                            </p>
                        </div>
                    </Link>

                    <Link
                        to="soon"
                        className="d-flex gap-2 col-12 col-md-3 mt-3"
                    >
                        <div className="settings-icon">
                            <MdAttachMoney size={25} />
                        </div>
                        <div>
                            <h5 className="card-title mb-0 dashboard__stats-card-title">
                                {t("supplier_pages.settings.billing")}
                            </h5>
                            <p className="text-wrap desc">
                                {t("supplier_pages.settings.soon")}
                            </p>
                        </div>
                    </Link>
                </div>
            </section>
        </main>
    );
};
export default Settings;
