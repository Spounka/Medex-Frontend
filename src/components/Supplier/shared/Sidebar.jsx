import { Link } from "react-router-dom";

import {
    MdSpaceDashboard,
    MdShop2,
    MdRequestQuote,
    MdListAlt,
    MdList,
    MdOutlinePointOfSale,
    MdAddToQueue,
    MdOutlinePreview,
} from "react-icons/md";
import { BiSolidOffer, BiSolidMessageAltDetail } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import {
    TbDatabasePlus,
    TbDatabaseEdit,
    TbDatabaseSearch,
    TbLanguage,
    TbTruckReturn,
    TbPasswordFingerprint,
} from "react-icons/tb";
import { BsGearFill, BsTruck } from "react-icons/bs";
import { LuTextQuote } from "react-icons/lu";
import { FaRegFileExcel } from "react-icons/fa";
import { IoStatsChart, IoStorefrontOutline } from "react-icons/io5";
import { TbHomeEdit } from "react-icons/tb";

import { useTranslation } from "react-i18next";

import arFlag from "../../../assets/images/sa-flag.png";
import enFlag from "../../../assets/images/us-flag.png";
import { useState } from "react";

const Sidebar = (props) => {
    const { t, i18n } = useTranslation();

    const { menuOpen } = props;
    const [li, setLi] = useState(1);

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
                                              ? "2px solid #8e65c1"
                                              : "",
                                      borderRight:
                                          i18n.resolvedLanguage == "ar"
                                              ? "2px solid #8e65c1"
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
                                              ? "2px solid #8e65c1"
                                              : "",
                                      borderRight:
                                          i18n.resolvedLanguage == "ar"
                                              ? "2px solid #8e65c1"
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
                            <span className="ms-1">
                                {t("buyer_sidebar.stats")}
                            </span>
                        </Link>
                    </li>

                    <li
                        style={
                            li == 3
                                ? {
                                      backgroundColor: "rgb(250, 250, 251)",
                                      borderLeft:
                                          i18n.resolvedLanguage == "en"
                                              ? "2px solid #8e65c1"
                                              : "",
                                      borderRight:
                                          i18n.resolvedLanguage == "ar"
                                              ? "2px solid #8e65c1"
                                              : "",
                                      width: "100%",
                                  }
                                : {}
                        }
                        className={li == 3 ? "px-3" : ""}
                        onClick={() => setLi(3)}
                    >
                        <Link
                            to="#products"
                            data-bs-toggle="collapse"
                            className="nav-link px-0 d-flex gap-2 align-items-center dashboard__link"
                        >
                            <MdShop2 size="1.5rem" />
                            <span className="ms-1">
                                {t("supplier_sidebar.products")}
                            </span>
                            <IoIosArrowDown size="0.8rem" />
                        </Link>
                        <ul
                            className="collapse nav flex-column mx-3"
                            id="products"
                            data-bs-parent="#menu"
                        >
                            <li className="w-100">
                                <Link
                                    to="/supplier/products/list"
                                    className="nav-link px-0 d-flex gap-2 align-items-center dashboard__link"
                                >
                                    <TbDatabaseSearch size="1.5rem" />
                                    {t("supplier_sidebar.products_list")}
                                </Link>
                            </li>


                            <li>
                                <Link
                                    to="/supplier/products/update"
                                    className="nav-link px-0 d-flex gap-2 align-items-center dashboard__link"
                                >
                                    <TbDatabaseEdit size="1.5rem" />
                                    {t("supplier_sidebar.update_product")}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="#createProduct"
                                    data-bs-toggle="collapse"
                                    className="nav-link px-0 d-flex gap-2 align-items-center dashboard__link"
                                >
                                    <TbDatabasePlus size="1.5rem" />
                                    <span className="ms-1">
                                        {t("supplier_sidebar.create_product")}
                                    </span>
                                    <IoIosArrowDown size="0.8rem" />
                                </Link>
                                <ul
                                    className="collapse nav flex-column mx-3"
                                    id="createProduct"
                                    data-bs-parent="#products"
                                >
                                    <li>
                                        <Link
                                            to="/supplier/products/create"
                                            className="nav-link px-0 d-flex gap-2 align-items-center dashboard__link"
                                        >
                                            <MdAddToQueue size="1.5rem" />
                                            {t(
                                                "supplier_sidebar.create_product_form"
                                            )}
                                        </Link>

                                        <Link
                                            to="/supplier/products/excel-create"
                                            className="nav-link px-0 d-flex gap-2 align-items-center dashboard__link"
                                        >
                                            <FaRegFileExcel size="1.5rem" />
                                            {t(
                                                "supplier_sidebar.create_product_excel"
                                            )}
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>

                    <li
                        style={
                            li == 4
                                ? {
                                      backgroundColor: "rgb(250, 250, 251)",
                                      borderLeft:
                                          i18n.resolvedLanguage == "en"
                                              ? "2px solid #8e65c1"
                                              : "",
                                      borderRight:
                                          i18n.resolvedLanguage == "ar"
                                              ? "2px solid #8e65c1"
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
                            <span className="ms-1">
                                {t("supplier_sidebar.sales")}
                            </span>
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
                                    <MdOutlinePointOfSale size="1.5rem" />
                                    {t("supplier_sidebar.all_sales")}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/supplier/tracking"
                                    className="nav-link px-0 d-flex gap-2 align-items-center dashboard__link"
                                >
                                    <BsTruck size="1.5rem" />
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
                                    <TbTruckReturn size="1.5rem" />
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
                                              ? "2px solid #8e65c1"
                                              : "",
                                      borderRight:
                                          i18n.resolvedLanguage == "ar"
                                              ? "2px solid #8e65c1"
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
                            <span className="ms-1">
                                {t("supplier_sidebar.quotes")}
                            </span>
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
                                    <MdList size="1.5rem" />
                                    <span className="ms-1">
                                        {t("supplier_sidebar.quote_requests")}
                                    </span>
                                </Link>
                                <Link
                                    to="/supplier/request-for-quote"
                                    className="nav-link px-0 d-flex gap-2 align-items-center dashboard__link"
                                >
                                    <MdRequestQuote size="1.5rem" />
                                    <span className="ms-1">{t("rfq")}</span>
                                </Link>
                                <Link
                                    to="/supplier/quotes/offers"
                                    className="nav-link px-0 d-flex gap-2 align-items-center dashboard__link"
                                >
                                    <BiSolidOffer size="1.5rem" />
                                    <span className="ms-1">
                                        {t("supplier_sidebar.offers_list")}{" "}
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
                                              ? "2px solid #8e65c1"
                                              : "",
                                      borderRight:
                                          i18n.resolvedLanguage == "ar"
                                              ? "2px solid #8e65c1"
                                              : "",
                                      width: "100%",
                                  }
                                : {}
                        }
                        className={li == 7 ? "px-3" : ""}
                        onClick={() => setLi(7)}
                    >
                        <Link
                            to="#store"
                            data-bs-toggle="collapse"
                            className="nav-link px-0 d-flex gap-2 align-items-center dashboard__link"
                        >
                            <IoStorefrontOutline size="1.5rem" />
                            <span className="ms-1">
                                {t("supplier_sidebar.store")}
                            </span>
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
                                    <TbHomeEdit size="1.5rem" />
                                    <span className="ms-1">
                                        {t("supplier_sidebar.edit_store")}
                                    </span>
                                </Link>
                                <Link
                                    to="/supplier/store/view"
                                    className="nav-link px-0 d-flex gap-2 align-items-center dashboard__link"
                                >
                                    <MdOutlinePreview size="1.5rem" />
                                    <span className="ms-1">
                                        {t("supplier_sidebar.view_store")}
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </li>

                    <li
                        style={
                            li == 8
                                ? {
                                      backgroundColor: "rgb(250, 250, 251)",
                                      borderLeft:
                                          i18n.resolvedLanguage == "en"
                                              ? "2px solid #8e65c1"
                                              : "",
                                      borderRight:
                                          i18n.resolvedLanguage == "ar"
                                              ? "2px solid #8e65c1"
                                              : "",
                                      width: "100%",
                                  }
                                : {}
                        }
                        className={li == 8 ? "px-3" : ""}
                        onClick={() => setLi(8)}
                    >
                        <Link
                            to="/supplier/chat"
                            className="nav-link px-0 d-flex gap-2 align-items-center dashboard__link"
                        >
                            <BiSolidMessageAltDetail size="1.5rem" />
                            <span className="ms-1">
                                {t("buyer_sidebar.messages")}
                            </span>
                        </Link>
                    </li>

                    <li
                        style={
                            li == 9
                                ? {
                                      backgroundColor: "rgb(250, 250, 251)",
                                      borderLeft:
                                          i18n.resolvedLanguage == "en"
                                              ? "2px solid #8e65c1"
                                              : "",
                                      borderRight:
                                          i18n.resolvedLanguage == "ar"
                                              ? "2px solid #8e65c1"
                                              : "",
                                      width: "100%",
                                  }
                                : {}
                        }
                        className={li == 9 ? "px-3" : ""}
                        onClick={() => setLi(9)}
                    >
                        <Link
                            to="#settings"
                            data-bs-toggle="collapse"
                            className="nav-link px-0 d-flex gap-2 align-items-center dashboard__link"
                        >
                            <BsGearFill size="1.5rem" />
                            <span className="ms-1">
                                {t("buyer_sidebar.settings")}
                            </span>
                            <IoIosArrowDown size="0.8rem" />
                        </Link>
                        <ul
                            className="collapse nav flex-column mx-3"
                            id="settings"
                            data-bs-parent="#menu"
                        >
                            <li>
                                <Link
                                    to="/supplier/account/password/update"
                                    className="nav-link px-0 d-flex gap-2 align-items-center dashboard__link"
                                >
                                    <TbPasswordFingerprint size="1.5rem" />
                                    <span className="ms-1">
                                        {t("supplier_sidebar.password_update")}
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="#language"
                                    data-bs-toggle="collapse"
                                    className="nav-link px-0 d-flex gap-2 align-items-center dashboard__link"
                                >
                                    <TbLanguage size="1.5rem" />
                                    <span className="ms-1">
                                        {t("supplier_sidebar.language")}
                                    </span>
                                    <IoIosArrowDown size="0.8rem" />
                                </Link>
                                <ul
                                    className="collapse nav flex-column mx-3"
                                    id="language"
                                    data-bs-parent="#settings"
                                >
                                    <li>
                                        <Link
                                            className="dropdown-item d-flex justify-content-around text-center"
                                            role="button"
                                            onClick={() =>
                                                i18n.changeLanguage("ar")
                                            }
                                        >
                                            <img
                                                src={arFlag}
                                                alt="AR"
                                                width="25"
                                                height="25"
                                            />
                                            <span className="text-dark">
                                                AR
                                            </span>
                                        </Link>
                                        <Link
                                            className="dropdown-item d-flex justify-content-around"
                                            role="button"
                                            onClick={() =>
                                                i18n.changeLanguage("en")
                                            }
                                        >
                                            <img
                                                src={enFlag}
                                                alt="EN"
                                                width="25"
                                                height="25"
                                            />
                                            <span className="text-dark">
                                                EN
                                            </span>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;
