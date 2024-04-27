import { Link } from "react-router-dom";
import { BiLogIn, BiLogOut, BiUserPlus } from "react-icons/bi";
import { MdOutlineSpaceDashboard } from "react-icons/md";

import { useContext, useDeferredValue, useEffect, useState } from "react";
import AuthContext from "../../../context/AuthContext";

import axios from "axios";

import arFlag from "../../../assets/images/sa-flag.png";
import enFlag from "../../../assets/images/us-flag.png";

import { useTranslation } from "react-i18next";
import Container from "../../ui/container";
import { UilShoppingCart, UilHeart, UilSearch, UilUser } from "@iconscout/react-unicons";
import clsx from "clsx";

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
                className="tw-flex tw-w-full"
                style={{ flexWrap: "nowrap" }}
            >
                <Link
                    to="/"
                    className="navbar-brand tw-font-algreya tw-text-5xl tw-font-extrabold"
                >
                    Medex
                </Link>
                <div className="d-flex justify-content-center align-items-center gap-4 d-md-none">
                    <div className="dropdown navbar__lang">
                        <Link
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
                </div>

                <div className="collapse navbar-collapse d-none d-md-block">
                    <ul
                        className={`navbar-nav ${
                            i18n.resolvedLanguage == "en" ? "ms-auto" : "me-auto"
                        } mb-2 mb-lg-0`}
                    >
                        <div className="d-flex justify-content-between align-items-center gap-4 navbar__top-section tw-w-full">
                            <div className="search-bar tw-w-fit">
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
                                                className="input-group m-0"
                                                style={{
                                                    direction: "ltr",
                                                }}
                                            >
                                                <button
                                                    type="submit"
                                                    className="input-group-text"
                                                    id="header-search-bar"
                                                    style={{
                                                        borderLeft: "none",
                                                        borderColor: "#bbbbbb",
                                                        backgroundColor: "white",
                                                    }}
                                                >
                                                    <UilSearch
                                                        width={"1.2rem"}
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
                                <div className="d-flex w-100 navbar__top-links tw-w-full tw-flex-grow tw-justify-end">
                                    <li className="nav-item">
                                        <Link
                                            to="/wishlist"
                                            className="nav-link d-flex justify-content-center align-items-center gap-2"
                                        >
                                            <UilHeart
                                                width={"2.5rem"}
                                                height={"auto"}
                                                fill={"black"}
                                            />
                                            <p className="m-0 header__link">
                                                {t("header.favorite")}
                                                <br /> {t("header.wishlist")}
                                            </p>
                                        </Link>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <div
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                            className="nav-link d-flex justify-content-center align-items-center gap-2 header__account-dropdown"
                                        >
                                            <UilUser
                                                fill={"black"}
                                                width={"2.5rem"}
                                                height={"auto"}
                                            />
                                            <span className="header__link">
                                                {t("header.your")} <br />{" "}
                                                {t("header.account")}
                                            </span>
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
                                                                className="dropdown-item navbar__category-link d-flex align-items-center gap-2"
                                                                role="button"
                                                                onClick={logoutUser}
                                                            >
                                                                <BiLogOut size="1.5rem" />
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
                                                width={"2.5rem"}
                                                height={"auto"}
                                                fill={"black"}
                                            />
                                            <span
                                                id="header-cart-count"
                                                className="badge text-xs p-1 header__cart-badge"
                                            >
                                                {countCartItems}
                                            </span>
                                        </Link>
                                    </li>
                                </div>
                            </div>
                        </div>
                    </ul>
                </div>
            </div>
        </Container>
    );
};

export default Header;
