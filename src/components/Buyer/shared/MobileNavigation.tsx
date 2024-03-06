import { Link } from "react-router-dom";

import {
    BiHomeAlt,
    BiCategoryAlt,
    BiLogIn,
    BiUserPlus,
    BiUserCircle,
    BiLogOut,
} from "react-icons/bi";
import {
    MdOutlineRequestQuote,
    MdOutlineSpaceDashboard,
    MdOutlineFeaturedPlayList,
    MdListAlt,
} from "react-icons/md";
import { LiaUsersCogSolid } from "react-icons/lia";
import { TiInfoLargeOutline } from "react-icons/ti";
import { BsCart3, BsTelephone } from "react-icons/bs";
import { PiChatsCircle } from "react-icons/pi";
import { FaRegHeart } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";

import AuthContext from "../../../context/AuthContext";
import { useContext, useEffect } from "react";

import { useTranslation } from "react-i18next";

const MobileNavigation = () => {
    const { t } = useTranslation();

    const { user, logoutUser } = useContext(AuthContext);

    useEffect(() => {
        const menu = document.querySelector(".navbar__category-menu-mobile");
        const menuItems = document.querySelectorAll(
            ".navbar__category-menu-mobile li"
        );
        menuItems.forEach((item) => {
            item.addEventListener("click", () => {
                menu.classList.remove("show");
            });
        });
    }, []);

    return (
        <div className="fixed-bottom bg-white d-block d-md-none">
            <div className="">
                <div className="d-flex justify-content-between py-1 px-2">
                    <Link
                        to="/"
                        className="d-flex flex-column justify-content-center align-items-center text-dark text-hover"
                        style={{ gap: "2px" }}
                    >
                        <BiHomeAlt style={{ fontSize: "1.3rem" }} />
                        <span className="text-xs fw">{t("home")}</span>
                    </Link>

                    <Link
                        to="/chat"
                        className="d-flex flex-column justify-content-center align-items-center text-dark text-hover"
                        style={{ gap: "2px" }}
                    >
                        <PiChatsCircle size="1.3rem" />
                        <span className="text-xs fw">{t("chat")}</span>
                    </Link>

                    <Link
                        to="/categories"
                        className="d-flex flex-column justify-content-center align-items-center text-dark text-hover"
                        style={{ gap: "2px" }}
                    >
                        <BiCategoryAlt style={{ fontSize: "1.3rem" }} />
                        <span className="text-xs fw">
                            {t("mobile.categories")}
                        </span>
                    </Link>

                    <div
                        className="dropup position-static"
                        style={{ gap: "2px" }}
                    >
                        <Link
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            data-bs-auto-close="outside"
                            className="d-flex flex-column justify-content-center align-items-center text-dark text-hover"
                            style={{gap: '2px'}}
                        >
                            <LiaUsersCogSolid style={{ fontSize: "1.3rem" }} />
                            <span className="text-xs fw">
                                {t("account")}
                            </span>
                        </Link>
                        <ul className="dropdown-menu w-100 navbar__category-menu-mobile">
                            {!user ? (
                                <>
                                    <h6 className="text-muted px-3 mb-3 d-flex align-items-center gap-2">
                                        <LiaUsersCogSolid
                                            style={{ fontSize: "1.3rem" }}
                                        />
                                        {t("account")}
                                    </h6>
                                    <li>
                                        <Link
                                            className=" dropdown-item navbar__category-link d-flex align-items-center gap-2 text-hover"
                                            to="/account/login"
                                        >
                                            <BiLogIn size="1.3rem" />
                                            {t("login")}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className="dropdown-item navbar__category-link d-flex align-items-center gap-2 text-hover"
                                            to="/account/register"
                                        >
                                            <BiUserPlus size="1.3rem" />
                                            {t("register")}
                                        </Link>
                                    </li>
                                    <h6 className="text-muted mt-4 px-3 mb-3 d-flex align-items-center gap-2">
                                        <TiInfoLargeOutline
                                            style={{ fontSize: "1.3rem" }}
                                        />
                                        {t("mobile.support")}
                                    </h6>
                                    <li>
                                        <Link
                                            className="dropdown-item navbar__category-link d-flex align-items-center gap-2 text-hover"
                                            to="/contact-us"
                                        >
                                            <BsTelephone size="1.3rem" />
                                            {t("contact_us")}
                                        </Link>
                                    </li>
                                </>
                            ) : user.role == "buyer" ? (
                                <>
                                    <h6 className="text-muted px-3 mb-3 d-flex align-items-center gap-2">
                                        <LiaUsersCogSolid
                                            style={{ fontSize: "1.3rem" }}
                                        />
                                        {t("account")}
                                    </h6>
                                    <li>
                                        <Link
                                            className="dropdown-item navbar__category-link d-flex align-items-center gap-2 text-hover"
                                            to="/account/dashboard"
                                        >
                                            <MdOutlineSpaceDashboard size="1.3rem" />
                                            {t("dashboard")}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className="dropdown-item navbar__category-link d-flex align-items-center gap-2 text-hover"
                                            to="/account/profile"
                                        >
                                            <BiUserCircle size="1.3rem" />
                                            {t("header.your_profile")}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className="dropdown-item navbar__category-link d-flex align-items-center gap-2 text-hover"
                                            to="/account/dashboard/order-history"
                                        >
                                            <MdListAlt size="1.3rem" />
                                            {t("buyer_sidebar.order_history")}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className="dropdown-item navbar__category-link d-flex align-items-center gap-2 text-hover"
                                            to="/wishlist"
                                        >
                                            <FaRegHeart size="1.3rem" />
                                            {t("header.wishlist")}
                                        </Link>
                                    </li>
                                    <h6 className="text-muted mt-4 px-3 mb-3 d-flex align-items-center gap-2">
                                        <MdOutlineRequestQuote
                                            style={{ fontSize: "1.3rem" }}
                                        />
                                        {t("supplier_sidebar.quotes")}
                                    </h6>
                                    <li>
                                        <Link
                                            className="dropdown-item navbar__category-link d-flex align-items-center gap-2 text-hover"
                                            to="/account/request-for-quote"
                                        >
                                            <MdOutlineRequestQuote size="1.3rem" />
                                            {t("rfq")}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className="dropdown-item navbar__category-link d-flex align-items-center gap-2 text-hover"
                                            to="/account/request-for-quote"
                                        >
                                            <MdOutlineFeaturedPlayList size="1.3rem" />
                                            {t("my_rfq")}
                                        </Link>
                                    </li>
                                    <h6 className="text-muted mt-4 px-3 mb-3 d-flex align-items-center gap-2">
                                        <TiInfoLargeOutline
                                            style={{ fontSize: "1.3rem" }}
                                        />
                                        {t("mobile.support")}
                                    </h6>
                                    <li>
                                        <Link
                                            className="dropdown-item navbar__category-link d-flex align-items-center gap-2 text-hover"
                                            to="/contact-us"
                                        >
                                            <BsTelephone size="1.5rem" />
                                            {t("contact_us")}
                                        </Link>
                                    </li>
                                    <h6 className="text-muted mt-4 px-3 mb-3 d-flex align-items-center gap-2">
                                        <IoSettingsOutline
                                            style={{ fontSize: "1.3rem" }}
                                        />
                                        {t("buyer_sidebar.settings")}
                                    </h6>
                                    <li>
                                        <Link
                                            className="dropdown-item navbar__category-link d-flex align-items-center gap-2 text-hover"
                                            role="button"
                                            onClick={logoutUser}
                                        >
                                            <BiLogOut size="1.3rem" />
                                            {t("logout")}
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <Link
                                            className="dropdown-item navbar__category-link d-flex align-items-center gap-2 text-hover"
                                            to="/supplier/dashboard"
                                        >
                                            <MdOutlineSpaceDashboard size="1.3rem" />
                                            {t("dashboard")}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className="dropdown-item navbar__category-link d-flex align-items-center gap-2 text-hover"
                                            role="button"
                                            onClick={logoutUser}
                                        >
                                            <BiLogOut size="1.3rem" />
                                            {t("logout")}
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>

                    <Link
                        to="/cart"
                        className="d-flex flex-column justify-content-center align-items-center text-dark text-hover"
                        style={{ gap: "2px" }}
                    >
                        <BsCart3 style={{ fontSize: "1.3rem" }} />
                        <span className="text-sm fw">
                            {t("mobile.cart")}
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MobileNavigation;
