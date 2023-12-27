import { Link } from "react-router-dom";

import {
    MdSpaceDashboard,
    MdShop2,
    MdRequestQuote,
    MdListAlt,
    MdList,
} from "react-icons/md";
import {
    BiSolidDownArrow,
    BiSolidOffer,
    BiSolidMessageAltDetail,
} from "react-icons/bi";
import {
    TbDatabasePlus,
    TbDatabaseEdit,
    TbDatabaseSearch,
    TbLanguage,
} from "react-icons/tb";
import { BsGearFill } from "react-icons/bs";
import { LuTextQuote } from "react-icons/lu";
import { useTranslation } from "react-i18next";

import arFlag from "../../../assets/images/sa-flag.png";
import enFlag from "../../../assets/images/us-flag.png";

const Sidebar = (props) => {
    const { t, i18n } = useTranslation();

    const { menuOpen } = props;

    return (
        <aside
            className={`p-0 mt-5 pt-2 dashboard__sidebar-container ${
                menuOpen && "dashboard__sidebar-container-visible"
            }`}
        >
            <div className="d-flex flex-column align-items-start text-white">
                <ul
                    className="nav nav-pills flex-column mt-4 px-3 mb-sm-auto mb-0 align-items-start"
                    id="menu"
                >
                    <li>
                        <Link
                            to="/supplier/dashboard"
                            className="nav-link px-0 d-flex gap-2 align-items-center dashboard__link"
                        >
                            <MdSpaceDashboard size="1.5rem" />
                            <span className="ms-1">{t("dashboard")}</span>
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="#products"
                            data-bs-toggle="collapse"
                            className="nav-link px-0 d-flex gap-2 align-items-center dashboard__link"
                        >
                            <MdShop2 size="1.5rem" />
                            <span className="ms-1">
                                {t("supplier_sidebar.products")}
                            </span>
                            <BiSolidDownArrow size=".5rem" />
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
                                    <TbDatabaseSearch size="1.3rem" />
                                    {t("supplier_sidebar.products_list")}
                                </Link>
                                <Link
                                    to="/supplier/products/create"
                                    className="nav-link px-0 d-flex gap-2 align-items-center dashboard__link"
                                >
                                    <TbDatabasePlus size="1.3rem" />
                                    {t("supplier_sidebar.create_product")}
                                </Link>
                                <Link
                                    to="/supplier/products/update"
                                    className="nav-link px-0 d-flex gap-2 align-items-center dashboard__link"
                                >
                                    <TbDatabaseEdit size="1.3rem" />
                                    {t("supplier_sidebar.update_product")}
                                </Link>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <Link
                            to="/supplier/orders"
                            className="nav-link px-0 d-flex gap-2 align-items-center dashboard__link"
                        >
                            <MdListAlt size="1.5rem" />
                            <span className="ms-1">
                                {t("supplier_sidebar.sales")}
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
                            <span className="ms-1">
                                {t("supplier_sidebar.quotes")}
                            </span>
                            <BiSolidDownArrow size=".5rem" />
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

                    <li>
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
                                    <BiSolidDownArrow size=".5rem" />
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
