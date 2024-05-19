import { Link } from "react-router-dom";
import {
    IoLogInOutline as BiLogIn,
    IoLogOutOutline as BiLogOut,
    IoPersonAddOutline as BiUserPlus,
} from "react-icons/io5";
import { RxDashboard as MdOutlineSpaceDashboard } from "react-icons/rx";

import { useContext, useDeferredValue, useEffect, useState } from "react";
import AuthContext from "../../../context/AuthContext";

import axios from "axios";

import arFlag from "../../../assets/images/sa-flag.png";
import enFlag from "../../../assets/images/us-flag.png";

import { useTranslation } from "react-i18next";
import Container from "../../ui/container";
import {
    IoCartOutline as UilShoppingCart,
    IoHeartOutline as UilHeart,
    IoSearchOutline as UilSearch,
    IoPersonOutline as UilUser,
} from "react-icons/io5";
import clsx from "clsx";
import { Label } from "react-aria-components";

function LanguageDropDown() {
    const { t, i18n } = useTranslation();
    return (
        <div className="">
            <Link
                to={"#"}
                role="button"
                className="dropdown-toggle bg-transparent d-flex align-items-center text-color-darkblue"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                {i18n.language === "en" ? (
                    <img
                        src={enFlag}
                        alt="EN"
                        width="25"
                    />
                ) : (
                    <img
                        src={arFlag}
                        alt="AR"
                        width="25"
                    />
                )}
            </Link>
            {i18n.language === "en" ? (
                <ul className="dropdown-menu dropdown-menu-end shadow">
                    <li className="text-center">
                        <Link
                            to={"#"}
                            className="dropdown-item d-flex justify-content-around text-center"
                            role="button"
                            onClick={() => i18n.changeLanguage("ar")}
                        >
                            <img
                                src={arFlag}
                                alt="AR"
                                width="25"
                            />
                            AR
                        </Link>
                    </li>
                    <li className="text-center">
                        <Link
                            to={"#"}
                            className="dropdown-item d-flex justify-content-around"
                            role="button"
                            onClick={() => i18n.changeLanguage("en")}
                        >
                            <img
                                src={enFlag}
                                alt="EN"
                                width="25"
                            />
                            EN
                        </Link>
                    </li>
                </ul>
            ) : (
                <ul className="dropdown-menu shadow">
                    <li className="text-center">
                        <Link
                            to={""}
                            className="dropdown-item d-flex justify-content-around text-center"
                            role="button"
                            onClick={() => i18n.changeLanguage("ar")}
                        >
                            <img
                                src={arFlag}
                                alt="AR"
                                width="25"
                            />
                            AR
                        </Link>
                    </li>
                    <li className="text-center">
                        <Link
                            to={""}
                            className="dropdown-item d-flex justify-content-around"
                            role="button"
                            onClick={() => i18n.changeLanguage("en")}
                        >
                            <img
                                src={enFlag}
                                alt="EN"
                                width="25"
                            />
                            EN
                        </Link>
                    </li>
                </ul>
            )}
        </div>
    );
}

const Header = () => {
    const { t, i18n } = useTranslation();

    const countCartItems = useDeferredValue(
        localStorage.getItem("cartItems")
            ? JSON.parse(localStorage.getItem("cartItems")).length
            : 0,
    );

    const { user, logoutUser } = useContext(AuthContext);

    const [categories, setCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const [uniqueParentSlugs, setUniqueParentSlugs] = useState([]);

    const getCategories = async () => {
        await axios
            .get(import.meta.env.VITE_BACKEND_URL + "/api/product/category")
            .then((res) => {
                setCategories(res.data);
                setUniqueParentSlugs([
                    ...new Set(res.data.map((cat) => cat.parent_slug)),
                ]);
            });
    };
    useEffect(() => {
        getCategories();
    }, []);

    const [scrolled, setScrolled] = useState(false);
    const handleScroll = () => {
        const offset = window.scrollY;
        if (offset > 75) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };
    window.addEventListener("scroll", handleScroll);

    return (
        <Container
            node={"nav"}
            className={clsx(
                "navbar navbar-expand-lg py-2 py-md-2 tw-sticky tw-top-0 tw-z-10 tw-bg-white",
                scrolled
                    ? "tw-shadow-[0_1px_5px_#bbb]"
                    : "tw-border-b tw-border-b-gray-300",
            )}
            style={{
                zIndex: "12",
                backgroundColor: "#ffffff",
            }}
        >
            <div
                className="tw-flex tw-w-full tw-justify-between tw-gap-4"
                style={{ flexWrap: "nowrap" }}
            >
                <div className="tw-flex tw-w-full tw-items-center tw-justify-between">
                    <div className="tw-flex tw-gap-2">
                        <Link
                            to="/"
                            className="tw-font-['Comic Sans'] tw-content-center tw-text-center tw-align-middle tw-text-4xl tw-font-bold lg:tw-text-5xl"
                        >
                            Medex
                        </Link>
                        <Label
                            className={
                                "tw-h-fit tw-rounded-full tw-bg-purple tw-px-2 tw-py-1 tw-font-poppins tw-text-xs tw-text-white"
                            }
                        >
                            Beta
                        </Label>
                    </div>
                    <div className="tw-hidden tw-gap-4 lg:tw-flex">
                        <Link
                            to={"/products/"}
                            className={
                                "tw-cursor-pointer tw-font-poppins tw-font-semibold tw-text-gray-600"
                            }
                        >
                            Products
                        </Link>
                        <Link
                            to={"/brands/"}
                            className={
                                "tw-cursor-pointer tw-font-poppins tw-font-semibold tw-text-gray-600"
                            }
                        >
                            Brands
                        </Link>
                        <Link
                            to={"/categories/"}
                            className={
                                "tw-cursor-pointer tw-font-poppins tw-font-semibold tw-text-gray-600"
                            }
                        >
                            Categories
                        </Link>
                        <Link
                            to={"/opportunities"}
                            className={
                                "tw-cursor-pointer tw-font-poppins tw-font-semibold tw-text-gray-600"
                            }
                        >
                            Opportunities
                        </Link>
                    </div>
                    <div
                        className={
                            "tw-flex tw-items-center tw-justify-end tw-gap-4 lg:tw-hidden"
                        }
                    >
                        <div className="tw-hidden tw-items-center tw-justify-end tw-gap-4 md:tw-flex">
                            <Link
                                to={"/products/"}
                                className={
                                    "tw-cursor-pointer tw-font-poppins tw-font-semibold tw-text-gray-600"
                                }
                            >
                                Products
                            </Link>
                            <Link
                                to={"/brands/"}
                                className={
                                    "tw-cursor-pointer tw-font-poppins tw-font-semibold tw-text-gray-600"
                                }
                            >
                                Brands
                            </Link>
                            <Link
                                to={"/categories/"}
                                className={
                                    "tw-cursor-pointer tw-font-poppins tw-font-semibold tw-text-gray-600"
                                }
                            >
                                Categories
                            </Link>
                        </div>
                        <Link
                            to={"/opportunities"}
                            className={
                                "tw-cursor-pointer tw-font-poppins tw-font-semibold tw-text-gray-600"
                            }
                        >
                            Opportunities
                        </Link>
                        <div className="tw-block md:tw-hidden">
                            <LanguageDropDown />
                        </div>
                    </div>
                </div>

                <div className="tw-hidden tw-w-auto md:tw-flex">
                    <ul
                        className={`navbar-nav ${
                            i18n.resolvedLanguage == "en" ? "ms-auto" : "me-auto"
                        } mb-2 mb-lg-0`}
                    >
                        <div className="d-flex justify-content-between align-items-center navbar__top-section tw-w-full tw-gap-4">
                            <div className="tw-hidden tw-w-max tw-px-0 xl:tw-flex">
                                <form
                                    method="get"
                                    action="/products"
                                >
                                    <li
                                        className={`w-100 ${
                                            i18n.resolvedLanguage == "en"
                                                ? "me-lg-5"
                                                : "ms-lg-5"
                                        }`}
                                    >
                                        <div className="nav-link">
                                            <div
                                                className="input-group m-0 tw-px-0"
                                                style={{
                                                    direction: "ltr",
                                                }}
                                            >
                                                <button
                                                    type="submit"
                                                    className="input-group-text tw-border-l-[rgb(187_187_187)]"
                                                    id="header-search-bar"
                                                    style={{
                                                        borderColor: "#bbbbbb",
                                                        backgroundColor: "white",
                                                    }}
                                                >
                                                    <UilSearch
                                                        width={"2.2rem"}
                                                        height={"auto"}
                                                        fill={"black"}
                                                    />
                                                </button>
                                                <input
                                                    type="text"
                                                    name="keyword"
                                                    className="form-control py-2"
                                                    placeholder={`${t(
                                                        "header.search_product",
                                                    )}...`}
                                                    aria-label={`${t(
                                                        "header.search_product",
                                                    )}...`}
                                                    aria-describedby="header-search-bar"
                                                />
                                            </div>
                                        </div>
                                    </li>
                                </form>
                            </div>
                            <div className="d-flex flex-column justify-content align-items-center navbar__top-section">
                                <div className="d-flex tw-min-w-100 navbar__top-links tw-w-full tw-flex-grow tw-items-center tw-justify-end">
                                    <li className="nav-item">
                                        <Link
                                            to="/wishlist"
                                            className="nav-link d-flex justify-content-center align-items-center gap-2"
                                        >
                                            <UilHeart
                                                className={
                                                    "tw-h-auto tw-w-8 tw-stroke-black"
                                                }
                                            />
                                        </Link>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <div
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                            className="nav-link d-flex justify-content-center align-items-center gap-2 header__account-dropdown"
                                        >
                                            <UilUser
                                                className={
                                                    "tw-h-auto tw-w-8 tw-stroke-black"
                                                }
                                            />
                                        </div>
                                        <ul
                                            className="dropdown-menu navbar__category-menu"
                                            style={{ position: "absolute" }}
                                        >
                                            {!user ? (
                                                <>
                                                    <li>
                                                        <Link
                                                            className="dropdown-item navbar__category-link d-flex align-items-center gap-2"
                                                            to="/account/login"
                                                        >
                                                            <BiLogIn size="1.5rem" />
                                                            {t("login")}
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link
                                                            className="dropdown-item navbar__category-link d-flex align-items-center gap-2"
                                                            to="/account/register"
                                                        >
                                                            <BiUserPlus size="1.5rem" />
                                                            {t("register")}
                                                        </Link>
                                                    </li>
                                                </>
                                            ) : (
                                                user.role == "buyer" && (
                                                    <>
                                                        <li>
                                                            <Link
                                                                className="dropdown-item navbar__category-link d-flex align-items-center gap-2"
                                                                to="/account/dashboard"
                                                            >
                                                                <MdOutlineSpaceDashboard size="1.5rem" />
                                                                {t("dashboard")}
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link
                                                                to={"#"}
                                                                className="dropdown-item navbar__category-link d-flex align-items-center gap-2"
                                                                role="button"
                                                                onClick={logoutUser}
                                                            >
                                                                <BiLogOut size="1.8rem" />
                                                                {t("logout")}
                                                            </Link>
                                                        </li>
                                                    </>
                                                )
                                            )}
                                        </ul>
                                    </li>
                                    <li className="nav-item">
                                        <Link
                                            to="/cart"
                                            className="nav-link d-flex justify-content-center align-items-center gap-2 text-color-darkblue position-relative"
                                        >
                                            <UilShoppingCart
                                                className={
                                                    "tw-h-auto tw-w-9 tw-stroke-black"
                                                }
                                            />
                                            {countCartItems > 0 ? (
                                                <span
                                                    id="header-cart-count"
                                                    className="tw-absolute tw-right-0 tw-top-0 tw-h-4 tw-w-4 tw-content-center tw-rounded-full tw-bg-purple tw-p-1 tw-text-center tw-text-xs tw-text-white"
                                                >
                                                    {countCartItems}
                                                </span>
                                            ) : null}
                                        </Link>
                                    </li>
                                </div>
                            </div>
                            <div className={clsx("tw-flex tw-min-w-8 lg:tw-flex")}>
                                <LanguageDropDown />
                            </div>
                        </div>
                    </ul>
                </div>
            </div>
        </Container>
    );
};

export default Header;
