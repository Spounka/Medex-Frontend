import { Link } from "react-router-dom";

import { GiPlatform } from "react-icons/gi";
import { LiaFileInvoiceSolid as PiInvoiceLight } from "react-icons/lia";
import { MdListAlt, MdWallet } from "react-icons/md";
import { BiSolidDownArrow, BiSolidMessageAltDetail } from "react-icons/bi";
import { LuTextQuote } from "react-icons/lu";
import { BsGearFill } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import { IoStatsChart } from "react-icons/io5";
import { CgShapeCircle } from "react-icons/cg";

const Sidebar = (props) => {
    const { t } = useTranslation();

    const { menuOpen } = props;

    return (
        <aside
            className={`pl-3 pr-4 buyer__dashboard-sidebar-container pt-3 pt-md-0 mb-md-5 ${
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
                            to="#orders"
                            data-bs-toggle="collapse"
                            className="nav-link px-0 d-flex gap-2 align-items-center dashboard__link"
                        >
                            <MdListAlt size="1.5rem" />
                            <span className="ms-1">{t("buyer_sidebar.orders")}</span>
                            <BiSolidDownArrow size=".5rem" />
                        </Link>
                        <ul
                            className="collapse nav flex-column mx-3"
                            id="orders"
                            data-bs-parent="#menu"
                        >
                            <li>
                                <Link
                                    to="/account/dashboard/order-history"
                                    className="nav-link px-0 d-flex gap-2 align-items-center dashboard__link"
                                >
                                    <CgShapeCircle size=".8rem" />
                                    <span className="ms-1">
                                        {t("buyer_sidebar.order_history")}
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/account/dashboard/order-tracking"
                                    className="nav-link px-0 d-flex gap-2 align-items-center dashboard__link"
                                >
                                    <CgShapeCircle size=".8rem" />
                                    <span className="ms-1">
                                        {t("buyer_sidebar.tracking")}
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/account/dashboard/return-requests"
                                    className="nav-link px-0 d-flex gap-2 align-items-center dashboard__link"
                                >
                                    <CgShapeCircle size=".8rem" />
                                    <span className="ms-1">
                                        {t("buyer_sidebar.return")}
                                    </span>
                                </Link>
                            </li>
                        </ul>
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
                                    <CgShapeCircle size=".8rem" />
                                    <span className="ms-1">
                                        {t("buyer_sidebar.my_quotes")}
                                    </span>
                                </Link>
                                <Link
                                    to="/account/dashboard/request-for-quote"
                                    className="nav-link px-0 d-flex gap-2 align-items-center dashboard__link"
                                >
                                    <CgShapeCircle size=".8rem" />
                                    <span className="ms-1">{t("rfq")}</span>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Link
                            to="/account/dashboard/invoices"
                            className="nav-link px-0 d-flex gap-2 align-items-center dashboard__link"
                        >
                            <PiInvoiceLight size="1.5rem" />
                            <span className="ms-1">Invoices</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/account/dashboard/opportunities"
                            className="nav-link px-0 d-flex gap-2 align-items-center dashboard__link"
                        >
                            <GiPlatform size="1.5rem" />

                            <span className="ms-1">Opportunities</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/account/dashboard/statistics"
                            className="nav-link px-0 d-flex gap-2 align-items-center dashboard__link"
                        >
                            <IoStatsChart size="1.5rem" />
                            <span className="ms-1">{t("buyer_sidebar.stats")}</span>
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/account/dashboard/chat"
                            className="nav-link px-0 d-flex gap-2 align-items-center dashboard__link"
                        >
                            <BiSolidMessageAltDetail size="1.5rem" />
                            <span className="ms-1">{t("buyer_sidebar.messages")}</span>
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/account/dashboard/wallet"
                            className="nav-link px-0 d-flex gap-2 align-items-center dashboard__link"
                        >
                            <MdWallet size="1.5rem" />
                            <span className="ms-1">{t("buyer_sidebar.wallet")}</span>
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/account/dashboard/settings"
                            className="nav-link px-0 d-flex gap-2 align-items-center dashboard__link"
                        >
                            <BsGearFill size="1.5rem" />
                            <span className="ms-1">{t("buyer_sidebar.settings")}</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;
