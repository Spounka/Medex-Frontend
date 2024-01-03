import { Link } from "react-router-dom";

import { MdRequestQuote, MdListAlt, MdList } from "react-icons/md";
import {
    BiSolidDownArrow,
    BiSolidMessageAltDetail,
    BiUserCircle,
} from "react-icons/bi";
import { LuTextQuote } from "react-icons/lu";
import { BsGearFill } from "react-icons/bs";
import { useTranslation } from "react-i18next";

const Sidebar = (props) => {
    const { t } = useTranslation();

    const { menuOpen } = props;

    return (
        <aside
            className={`buyer__dashboard-sidebar-container pt-3 pt-md-0 mb-md-5 ${
                menuOpen && "buyer__dashboard-sidebar-container-visible"
            }`}
        >
            <div className="d-flex flex-column align-items-start text-white">
                <ul
                    className="nav nav-pills flex-column mt-3 px-3 mb-sm-auto mb-0 align-items-start text-dark"
                    id="menu"
                >
                    <h4 className="fw-bold">{t("dashboard")}</h4>
                    <li>
                        <Link
                            to="/account/dashboard/order-history"
                            className="nav-link px-0 d-flex gap-2 align-items-center dashboard__link"
                        >
                            <MdListAlt size="1.5rem" />
                            <span className="ms-1">
                                {t("buyer_sidebar.order_history")}
                            </span>
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="#quotes"
                            data-bs-toggle="collapse"
                            className="nav-link px-0 d-flex gap-2 align-items-center dashboard__link"
                        >
                            <LuTextQuote size="1.5rem" />
                            <span className="ms-1">{t("my_rfq")}</span>
                            <BiSolidDownArrow size=".5rem" />
                        </Link>
                        <ul
                            className="collapse nav flex-column mx-3"
                            id="quotes"
                            data-bs-parent="#menu"
                        >
                            <li className="w-100">
                                <Link
                                    to="/account/dashboard/quotes"
                                    className="nav-link px-0 d-flex gap-2 align-items-center dashboard__link"
                                >
                                    <MdList size="1.5rem" />
                                    <span className="ms-1">
                                        {t("buyer_sidebar.my_quotes")}
                                    </span>
                                </Link>
                                <Link
                                    to="/account/dashboard/request-for-quote"
                                    className="nav-link px-0 d-flex gap-2 align-items-center dashboard__link"
                                >
                                    <MdRequestQuote size="1.5rem" />
                                    <span className="ms-1">{t("rfq")}</span>
                                </Link>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <Link
                            to="/account/dashboard/chat"
                            className="nav-link px-0 d-flex gap-2 align-items-center dashboard__link"
                        >
                            <BiSolidMessageAltDetail size="1.5rem" />
                            <span className="ms-1">
                                {t("buyer_sidebar.messages")}
                            </span>
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="#settings"
                            data-bs-toggle="collapse"
                            className="nav-link px-0 d-flex gap-2 align-items-center dashboard__link"
                        >
                            <BsGearFill size="1.5rem" />
                            <span className="ms-1">
                                {t("buyer_sidebar.settings")}
                            </span>
                            <BiSolidDownArrow size=".5rem" />
                        </Link>
                        <ul
                            className="collapse nav flex-column mx-3"
                            id="settings"
                            data-bs-parent="#menu"
                        >
                            <li className="w-100">
                                <Link
                                    to="/account/profile"
                                    className="nav-link px-0 d-flex gap-2 align-items-center dashboard__link"
                                >
                                    <BiUserCircle size="1.5rem" />
                                    <span className="ms-1">
                                        {t("buyer_sidebar.my_profile")}
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;
