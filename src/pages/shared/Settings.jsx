import { FaStore } from "react-icons/fa";
import { IoPersonCircleSharp, IoSettings } from "react-icons/io5";
import { MdAttachMoney, MdLocalShipping } from "react-icons/md";
import { GoRepoForked } from "react-icons/go";
import { LuSettings2 } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

const Settings = () => {
    const { t } = useTranslation();
    const { user } = useContext(AuthContext);

    return (
        <main
            className="px-0 px-md-3"
            style={{ backgroundColor: "rgb(250, 250, 251)" }}
        >
            <section className="container-fluid">
                <h2 className="d-flex align-items-center gap-2 dashboard__title mt-2">
                    {t("buyer_sidebar.settings")}
                </h2>
                <div
                    className="col-12 p-4 gap-4 d-flex flex-wrap"
                    style={{ backgroundColor: "#fff" }}
                >
                    <Link to="../../account/profile" className="d-flex gap-2">
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
                    <Link to="soon" className="d-flex gap-2">
                        <div className="settings-icon">
                            <IoPersonCircleSharp size={25} />
                        </div>
                        <div>
                            <h5 className="card-title mb-0 dashboard__stats-card-title">
                                {t("supplier_pages.settings.user&per")}
                            </h5>
                            <p className="text-wrap desc">
                                {t("supplier_pages.settings.soon")}
                            </p>
                        </div>
                    </Link>
                    <Link to="soon" className="d-flex gap-2">
                        <div className="settings-icon">
                            <LuSettings2 size={25} />
                        </div>
                        <div>
                            <h5 className="card-title mb-0 dashboard__stats-card-title">
                                {t("supplier_pages.settings.company")}
                            </h5>
                            <p className="text-wrap desc">
                                {t("supplier_pages.settings.soon")}
                            </p>
                        </div>
                    </Link>
                    {user.role == "supplier" && (
                        <Link to="store" className="d-flex gap-2">
                            <div className="settings-icon">
                                <FaStore size={25} />
                            </div>
                            <div>
                                <h5 className="card-title mb-0 dashboard__stats-card-title">
                                    {t("supplier_pages.settings.store")}
                                </h5>
                                <p className="text-wrap desc">
                                    {t("supplier_pages.settings.storeD")}
                                </p>
                            </div>
                        </Link>
                    )}
                    <Link to="soon" className="d-flex gap-2">
                        <div className="settings-icon">
                            <MdLocalShipping size={25} />
                        </div>
                        <div>
                            <h5 className="card-title mb-0 dashboard__stats-card-title">
                                {t("supplier_pages.settings.shipping")}
                            </h5>
                            <p className="text-wrap desc">
                                {t("supplier_pages.settings.soon")}
                            </p>
                        </div>
                    </Link>
                    <Link to="soon" className="d-flex gap-2">
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
                    {user.role == "supplier" && (
                        <Link to="soon" className="d-flex gap-2">
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
                    )}
                </div>
            </section>
        </main>
    );
};
export default Settings;
