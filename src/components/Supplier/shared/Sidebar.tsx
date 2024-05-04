import { Link } from "react-router-dom";

import { LiaFileInvoiceSolid as PiInvoiceLight } from "react-icons/lia";
import { BiSolidMessageAltDetail } from "react-icons/bi";
import { BsGearFill } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { IoStatsChart, IoStorefrontOutline } from "react-icons/io5";
import { LuTextQuote } from "react-icons/lu";
import { CgShapeCircle } from "react-icons/cg";
import { MdListAlt, MdShop2, MdSpaceDashboard, MdWallet } from "react-icons/md";

import { useTranslation } from "react-i18next";

import { useState } from "react";
import { GiPlatform } from "react-icons/gi";

const Sidebar = (props) => {
    const { t, i18n } = useTranslation();

    const { menuOpen } = props;
    const [li, setLi] = useState(0);

    return (
        <aside
            className={`p-0 mt-5 pt-2 dashboard__sidebar-container ${
                menuOpen && "dashboard__sidebar-container-visible"
            } ${i18n.resolvedLanguage == "en" ? "" : "ar"}`}
        >
            <div className="d-flex flex-column align-items-start text-white">
                <ul
                    className="nav nav-pills flex-column mt-4 px-3 w-100 mb-sm-auto mb-0 align-items-start"
                    id="menu"
                >
                    <li
                        style={
                            li == 1
                                ? {
                                      backgroundColor: "rgb(250, 250, 251)",
                                      borderLeft:
                                          i18n.resolvedLanguage == "en"
                                              ? "2px solid var(--theme-color-primary)"
                                              : "",
                                      borderRight:
                                          i18n.resolvedLanguage == "ar"
                                              ? "2px solid var(--theme-color-primary)"
                                              : "",
                                      width: "100%",
                                  }
                                : {}
                        }
                        className={li == 1 ? "px-3" : ""}
                        onClick={() => setLi(1)}
                    >
                        <Link
                            to="/supplier/dashboard"
                            className="nav-link px-0 d-flex gap-2 align-items-center dashboard__link"
                        >
                            <MdSpaceDashboard size="1.5rem" />
                            <span className="ms-1">{t("dashboard")}</span>
                        </Link>
                    </li>

                    <li
                        style={
                            li == 2
                                ? {
                                      backgroundColor: "rgb(250, 250, 251)",
                                      borderLeft:
                                          i18n.resolvedLanguage == "en"
                                              ? "2px solid var(--theme-color-primary)"
                                              : "",
                                      borderRight:
                                          i18n.resolvedLanguage == "ar"
                                              ? "2px solid var(--theme-color-primary)"
                                              : "",
                                      width: "100%",
                                  }
                                : {}
                        }
                        className={li == 2 ? "px-3" : ""}
                        onClick={() => setLi(2)}
                    >
                        <Link
                            to="/supplier/statistics"
                            className="nav-link px-0 d-flex gap-2 align-items-center dashboard__link"
                        >
                            <IoStatsChart size="1.5rem" />
                            <span className="ms-1">{t("buyer_sidebar.stats")}</span>
                        </Link>
                    </li>

                    <li
                        style={
                            li == 3
                                ? {
                                      backgroundColor: "rgb(250, 250, 251)",
                                      borderLeft:
                                          i18n.resolvedLanguage == "en"
                                              ? "2px solid var(--theme-color-primary)"
                                              : "",
                                      borderRight:
                                          i18n.resolvedLanguage == "ar"
                                              ? "2px solid var(--theme-color-primary)"
                                              : "",
                                      width: "100%",
                                  }
                                : {}
                        }
                        className={li == 3 ? "px-3" : ""}
                        onClick={() => setLi(3)}
                    >
                        <Link
                            to="/supplier/products/list"
                            className="nav-link px-0 d-flex gap-2 align-items-center dashboard__link"
                        >
                            <MdShop2 size="1.5rem" />
                            <span className="ms-1">{t("supplier_sidebar.products")}</span>
                        </Link>
                    </li>

                    <li
                        style={
                            li == 4
                                ? {
                                      backgroundColor: "rgb(250, 250, 251)",
                                      borderLeft:
                                          i18n.resolvedLanguage == "en"
                                              ? "2px solid var(--theme-color-primary)"
                                              : "",
                                      borderRight:
                                          i18n.resolvedLanguage == "ar"
                                              ? "2px solid var(--theme-color-primary)"
                                              : "",
                                      width: "100%",
                                  }
                                : {}
                        }
                        className={li == 4 ? "px-3" : ""}
                        onClick={() => setLi(4)}
                    >
                        <Link
                            to="#sales"
                            data-bs-toggle="collapse"
                            className="nav-link px-0 d-flex gap-2 align-items-center dashboard__link"
                        >
                            <MdListAlt size="1.5rem" />
                            <span className="ms-1">{t("supplier_sidebar.sales")}</span>
                            <IoIosArrowDown size="0.8rem" />
                        </Link>
                        <ul
                            className="collapse nav flex-column mx-3"
                            id="sales"
                            data-bs-parent="#menu"
                        >
                            <li className="w-100">
                                <Link
                                    to="/supplier/sales"
                                    className="nav-link px-0 d-flex gap-2 align-items-center dashboard__link"
                                >
                                    <CgShapeCircle size=".8rem" />
                                    {t("supplier_sidebar.all_sales")}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/supplier/tracking"
                                    className="nav-link px-0 d-flex gap-2 align-items-center dashboard__link"
                                >
                                    <CgShapeCircle size=".9rem" />
                                    <span className="ms-1">
                                        {t("supplier_sidebar.tracking")}
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/supplier/return-requests"
                                    className="nav-link px-0 d-flex gap-2 align-items-center dashboard__link"
                                >
                                    <CgShapeCircle size=".8rem" />
                                    <span className="ms-1">
                                        {t("supplier_sidebar.return_requests")}
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </li>

                    <li
                        style={
                            li == 5
                                ? {
                                      backgroundColor: "rgb(250, 250, 251)",
                                      borderLeft:
                                          i18n.resolvedLanguage == "en"
                                              ? "2px solid var(--theme-color-primary)"
                                              : "",
                                      borderRight:
                                          i18n.resolvedLanguage == "ar"
                                              ? "2px solid var(--theme-color-primary)"
                                              : "",
                                      width: "100%",
                                  }
                                : {}
                        }
                        className={li == 5 ? "px-3" : ""}
                        onClick={() => setLi(5)}
                    >
                        <Link
                            to="#quotes"
                            data-bs-toggle="collapse"
                            className="nav-link px-0 d-flex gap-2 align-items-center dashboard__link"
                        >
                            <LuTextQuote size="1.5rem" />
                            <span className="ms-1">{t("supplier_sidebar.quotes")}</span>
                            <IoIosArrowDown size="0.8rem" />
                        </Link>
                        <ul
                            className="collapse nav flex-column mx-3"
                            id="quotes"
                            data-bs-parent="#menu"
                        >
                            <li className="w-100">
                                <Link
                                    to="/supplier/quotes"
                                    className="nav-link px-0 d-flex gap-2 align-items-center dashboard__link"
                                >
                                    <CgShapeCircle size=".8rem" />
                                    <span className="ms-1">
                                        {t("supplier_sidebar.quote_requests")}
                                    </span>
                                </Link>
                                <Link
                                    to="/supplier/request-for-quote"
                                    className="nav-link px-0 d-flex gap-2 align-items-center dashboard__link"
                                >
                                    <CgShapeCircle size=".9rem" />
                                    <span className="ms-1">{t("rfq")}</span>
                                </Link>
                                <Link
                                    to="/supplier/quotes/offers"
                                    className="nav-link px-0 d-flex gap-2 align-items-center dashboard__link"
                                >
                                    <CgShapeCircle size=".8rem" />
                                    <span className="ms-1">
                                        {t("supplier_sidebar.offers_list")}{" "}
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li
                        style={
                            li == 3
                                ? {
                                      backgroundColor: "rgb(250, 250, 251)",
                                      borderLeft:
                                          i18n.resolvedLanguage == "en"
                                              ? "2px solid var(--theme-color-primary)"
                                              : "",
                                      borderRight:
                                          i18n.resolvedLanguage == "ar"
                                              ? "2px solid var(--theme-color-primary)"
                                              : "",
                                      width: "100%",
                                  }
                                : {}
                        }
                        className={li == 10 ? "px-3" : ""}
                        onClick={() => setLi(10)}
                    >
                        <Link
                            to="/supplier/invoices/list"
                            className="nav-link px-0 d-flex gap-2 align-items-center dashboard__link"
                        >
                            <PiInvoiceLight size="1.5rem" />
                            <span className="ms-1">Invoices</span>
                        </Link>
                    </li>
                    <li
                        style={
                            li == 11
                                ? {
                                      backgroundColor: "rgb(250, 250, 251)",
                                      borderLeft:
                                          i18n.resolvedLanguage == "en"
                                              ? "2px solid var(--theme-color-primary)"
                                              : "",
                                      borderRight:
                                          i18n.resolvedLanguage == "ar"
                                              ? "2px solid var(--theme-color-primary)"
                                              : "",
                                      width: "100%",
                                  }
                                : {}
                        }
                        className={li == 11 ? "px-3" : ""}
                        onClick={() => setLi(11)}
                    >
                        <Link
                            to="/supplier/opportunities"
                            className="nav-link px-0 d-flex gap-2 align-items-center dashboard__link"
                        >
                            <GiPlatform size="1.5rem" />

                            <span className="ms-1">Opportunities</span>
                        </Link>
                    </li>
                    <li
                        style={
                            li == 6
                                ? {
                                      backgroundColor: "rgb(250, 250, 251)",
                                      borderLeft:
                                          i18n.resolvedLanguage == "en"
                                              ? "2px solid var(--theme-color-primary)"
                                              : "",
                                      borderRight:
                                          i18n.resolvedLanguage == "ar"
                                              ? "2px solid var(--theme-color-primary)"
                                              : "",
                                      width: "100%",
                                  }
                                : {}
                        }
                        className={li == 6 ? "px-3" : ""}
                        onClick={() => setLi(6)}
                    >
                        <Link
                            to="#store"
                            data-bs-toggle="collapse"
                            className="nav-link px-0 d-flex gap-2 align-items-center dashboard__link"
                        >
                            <IoStorefrontOutline size="1.5rem" />
                            <span className="ms-1">{t("supplier_sidebar.store")}</span>
                            <IoIosArrowDown size="0.8rem" />
                        </Link>
                        <ul
                            className="collapse nav flex-column mx-3"
                            id="store"
                            data-bs-parent="#menu"
                        >
                            <li className="w-100">
                                <Link
                                    to="/supplier/store/edit"
                                    className="nav-link px-0 d-flex gap-2 align-items-center dashboard__link"
                                >
                                    <CgShapeCircle size=".8rem" />
                                    <span className="ms-1">
                                        {t("supplier_sidebar.edit_store")}
                                    </span>
                                </Link>
                                <Link
                                    to="/supplier/store/view"
                                    className="nav-link px-0 d-flex gap-2 align-items-center dashboard__link"
                                >
                                    <CgShapeCircle size=".8rem" />
                                    <span className="ms-1">
                                        {t("supplier_sidebar.view_store")}
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </li>

                    <li
                        style={
                            li == 7
                                ? {
                                      backgroundColor: "rgb(250, 250, 251)",
                                      borderLeft:
                                          i18n.resolvedLanguage == "en"
                                              ? "2px solid var(--theme-color-primary)"
                                              : "",
                                      borderRight:
                                          i18n.resolvedLanguage == "ar"
                                              ? "2px solid var(--theme-color-primary)"
                                              : "",
                                      width: "100%",
                                  }
                                : {}
                        }
                        className={li == 7 ? "px-3" : ""}
                        onClick={() => setLi(7)}
                    >
                        <Link
                            to="/supplier/chat"
                            className="nav-link px-0 d-flex gap-2 align-items-center dashboard__link"
                        >
                            <BiSolidMessageAltDetail size="1.5rem" />
                            <span className="ms-1">{t("buyer_sidebar.messages")}</span>
                        </Link>
                    </li>

                    <li
                        style={
                            li == 8
                                ? {
                                      backgroundColor: "rgb(250, 250, 251)",
                                      borderLeft:
                                          i18n.resolvedLanguage == "en"
                                              ? "2px solid var(--theme-color-primary)"
                                              : "",
                                      borderRight:
                                          i18n.resolvedLanguage == "ar"
                                              ? "2px solid var(--theme-color-primary)"
                                              : "",
                                      width: "100%",
                                  }
                                : {}
                        }
                        className={li == 8 ? "px-3" : ""}
                        onClick={() => setLi(8)}
                    >
                        <Link
                            to="/supplier/wallet"
                            className="nav-link px-0 d-flex gap-2 align-items-center dashboard__link"
                        >
                            <MdWallet size="1.5rem" />
                            <span className="ms-1">{t("buyer_sidebar.wallet")}</span>
                        </Link>
                    </li>

                    <li
                        style={
                            li == 9
                                ? {
                                      backgroundColor: "rgb(250, 250, 251)",
                                      borderLeft:
                                          i18n.resolvedLanguage == "en"
                                              ? "2px solid var(--theme-color-primary)"
                                              : "",
                                      borderRight:
                                          i18n.resolvedLanguage == "ar"
                                              ? "2px solid var(--theme-color-primary)"
                                              : "",
                                      width: "100%",
                                  }
                                : {}
                        }
                        className={li == 9 ? "px-3" : ""}
                        onClick={() => setLi(9)}
                    >
                        <Link
                            to="/supplier/settings"
                            // data-bs-toggle="collapse"
                            className="nav-link px-0 d-flex gap-2 align-items-center dashboard__link"
                        >
                            <BsGearFill size="1.5rem" />
                            <span className="ms-1">{t("buyer_sidebar.settings")}</span>
                            {/* <IoIosArrowDown size="0.8rem" /> */}
                        </Link>
                    </li>
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;
