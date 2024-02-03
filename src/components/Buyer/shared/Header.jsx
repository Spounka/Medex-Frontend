import { NavLink, Link } from "react-router-dom";

import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import {
    BiHomeAlt,
    BiCategoryAlt,
    BiLogIn,
    BiLogOut,
    BiUserPlus,
} from "react-icons/bi";
import { BsTelephone } from "react-icons/bs";
import { MdOutlineSpaceDashboard, MdStorefront } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";

import AuthContext from "../../../context/AuthContext";
import { useContext, useDeferredValue, useEffect, useState } from "react";

import axios from "axios";

import arFlag from "../../../assets/images/sa-flag.png";
import enFlag from "../../../assets/images/us-flag.png";

import { useTranslation } from "react-i18next";

const Header = () => {
    const { t, i18n } = useTranslation();

    const countCartItems = useDeferredValue(
        localStorage.getItem("cartItems")
            ? JSON.parse(localStorage.getItem("cartItems")).length
            : 0
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
        if (offset > 103) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };
    window.addEventListener("scroll", handleScroll);

    return (
        <header>
            <nav
                className={`navbar navbar-expand-lg py-2 py-md-2 ${
                    scrolled == true ? "position-fixed w-100" : ""
                }`}
                style={{
                    zIndex: "12",
                    backgroundColor: "#ffffff",
                    boxShadow: "0 1px 5px #bbbbbb",
                }}
            >
                <div
                    className="container-xxl"
                    style={{ padding: "0 25px", flexWrap: "nowrap" }}
                >
                    <Link to="/" className="navbar-brand fs-2 fw-bold">
                        Medex
                    </Link>
                    <div className="d-flex justify-content-center align-items-center gap-4 d-md-none">
                        <Link
                            to="wishlist"
                            className="flex-column d-flex justify-content-center align-items-center text-color-darkblue"
                        >
                            <svg
                                id="Capa_1"
                                width="20px"
                                height="20px"
                                fill="white"
                                className="svg-fill"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 64 64"
                            >
                                <g id="Layer_46" data-name="Layer 46">
                                    <path d="M56.73,10.82a16.36,16.36,0,0,0-23,0L32,12.51l-1.7-1.69a16.36,16.36,0,0,0-23,0,16.28,16.28,0,0,0,0,23L30.94, 57.52a1.51,1.51,0,0,0,2.12,0L56.73,33.85A16.36,16.36,0,0,0,56.73,10.82ZM54.61,31.73,32,54.33,9.39,31.73a13.21, 13.21,0,0,1-3.89-9.4A13.35,13.35,0,0,1,18.79,9.05a13.16,13.16,0,0,1,9.39,3.89l2.76,2.75a1.49,1.49,0,0,0,2.12,0l2.76-2.75A13.29,13.29,0,0,1,54.61,31.73Z"></path>
                                </g>
                            </svg>
                        </Link>
                        <div className="dropdown navbar__lang">
                            <Link
                                role="button"
                                className="dropdown-toggle bg-transparent d-flex align-items-center text-color-darkblue"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                {i18n.language === "en" ? (
                                    <img src={enFlag} alt="EN" width="25" />
                                ) : (
                                    <img src={arFlag} alt="AR" width="25" />
                                )}
                            </Link>
                            {i18n.language === "en" ? (
                                <ul className="dropdown-menu dropdown-menu-end shadow">
                                    <li className="text-center">
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
                                            />
                                            AR
                                        </Link>
                                    </li>
                                    <li className="text-center">
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
                                            />
                                            EN
                                        </Link>
                                    </li>
                                </ul>
                            ) : (
                                <ul className="dropdown-menu shadow">
                                    <li className="text-center">
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
                                            />
                                            AR
                                        </Link>
                                    </li>
                                    <li className="text-center">
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
                                i18n.resolvedLanguage == "en"
                                    ? "ms-auto"
                                    : "me-auto"
                            } mb-2 mb-lg-0`}
                            style={{ width: "100%" }}
                        >
                            <div
                                className="d-flex justify-content-between align-items-center gap-4 navbar__top-section"
                                style={{ width: "100%" }}
                            >
                                <div className="search-bar">
                                    <form method="get" action="/products">
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
                                                    <input
                                                        type="text"
                                                        name="keyword"
                                                        className="form-control py-2"
                                                        placeholder={`${t(
                                                            "header.search_product"
                                                        )}...`}
                                                        aria-label={`${t(
                                                            "header.search_product"
                                                        )}...`}
                                                        aria-describedby="header-search-bar"
                                                    />

                                                    <button
                                                        type="submit"
                                                        className="input-group-text"
                                                        id="header-search-bar"
                                                        style={{
                                                            borderLeft: "none",
                                                            borderColor:
                                                                "#bbbbbb",
                                                            backgroundColor:
                                                                "white",
                                                        }}
                                                    >
                                                        <CiSearch
                                                            className="fs-5"
                                                            style={{
                                                                color: "#8e65c1",
                                                            }}
                                                        />
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    </form>
                                </div>
                                <div className="d-flex flex-column justify-content align-items-center navbar__top-section">
                                    <div className="d-flex w-100 navbar__top-links">
                                        <li className="nav-item">
                                            <Link
                                                to="wishlist"
                                                className="nav-link d-flex justify-content-center align-items-center gap-2"
                                            >
                                                <svg
                                                    id="Capa_1"
                                                    width="37px"
                                                    height="37px"
                                                    fill="#2d2822"
                                                    className="svg-fill"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 64 64"
                                                >
                                                    <g
                                                        id="Layer_46"
                                                        data-name="Layer 46"
                                                    >
                                                        <path d="M56.73,10.82a16.36,16.36,0,0,0-23,0L32,12.51l-1.7-1.69a16.36,16.36,0,0,0-23,0,16.28,16.28,0,0,0,0,23L30.94, 57.52a1.51,1.51,0,0,0,2.12,0L56.73,33.85A16.36,16.36,0,0,0,56.73,10.82ZM54.61,31.73,32,54.33,9.39,31.73a13.21, 13.21,0,0,1-3.89-9.4A13.35,13.35,0,0,1,18.79,9.05a13.16,13.16,0,0,1,9.39,3.89l2.76,2.75a1.49,1.49,0,0,0,2.12,0l2.76-2.75A13.29,13.29,0,0,1,54.61,31.73Z"></path>
                                                    </g>
                                                </svg>
                                                <p className="m-0 header__link">
                                                    {t("header.favorite")}
                                                    <br />{" "}
                                                    {t("header.wishlist")}
                                                </p>
                                            </Link>
                                        </li>
                                        <li className="nav-item dropdown">
                                            <div
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                                className="nav-link d-flex justify-content-center align-items-center gap-2 header__account-dropdown"
                                            >
                                                <svg
                                                    id="Capa_1"
                                                    height="35px"
                                                    width="35px"
                                                    viewBox="0 0 32 32"
                                                    xmlSpace="http://www.w3.org/2000/svg"
                                                >
                                                    <g>
                                                        <path
                                                            d="M16,16A7,7,0,1,0,9,9,7,7,0,0,0,16,16ZM16,4a5,5,0,1,1-5,5A5,5,0,0,1,16,4Z"
                                                            id="id_101"
                                                            style={{
                                                                fill: "#2d2822",
                                                            }}
                                                            className="svg-fill"
                                                        ></path>
                                                        <path
                                                            d="M17,18H15A11,11,0,0,0,4,29a1,1,0,0,0,1,1H27a1,1,0,0,0,1-1A11,11,0,0,0,17,18ZM6.06,28A9,9,0,0,1,15,20h2a9,9,0,0,1,8.94,8Z"
                                                            id="id_102"
                                                            style={{
                                                                fill: "#2d2822",
                                                            }}
                                                            className="svg-fill"
                                                        ></path>
                                                    </g>
                                                </svg>
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
                                                                    {t(
                                                                        "dashboard"
                                                                    )}
                                                                </Link>
                                                            </li>
                                                            <li>
                                                                <Link
                                                                    className="dropdown-item navbar__category-link d-flex align-items-center gap-2"
                                                                    role="button"
                                                                    onClick={
                                                                        logoutUser
                                                                    }
                                                                >
                                                                    <BiLogOut size="1.5rem" />
                                                                    {t(
                                                                        "logout"
                                                                    )}
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
                                                <svg
                                                    id="Capa_1"
                                                    height="37px"
                                                    width="37px"
                                                    fill="#2d2822"
                                                    className="svg-fill m-0 p-0"
                                                    version="1.1"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                                    x="0px"
                                                    y="0px"
                                                    viewBox="0 0 511.999 511.999"
                                                    style={{
                                                        enableBackground:
                                                            "new 0 0 511.999 511.999",
                                                    }}
                                                    xmlSpace="preserve"
                                                >
                                                    <g>
                                                        <g>
                                                            <path
                                                                d="M214.685,402.828c-24.829,0-45.029,20.2-45.029,45.029c0,24.829,20.2,45.029,45.029,45.029s45.029-20.2,45.029-45.029
                                                                    C259.713,423.028,239.513,402.828,214.685,402.828z M214.685,467.742c-10.966,0-19.887-8.922-19.887-19.887
                                                                    c0-10.966,8.922-19.887,19.887-19.887s19.887,8.922,19.887,19.887C234.572,458.822,225.65,467.742,214.685,467.742z"
                                                            ></path>
                                                        </g>
                                                    </g>
                                                    <g>
                                                        <g>
                                                            <path
                                                                d="M372.63,402.828c-24.829,0-45.029,20.2-45.029,45.029c0,24.829,20.2,45.029,45.029,45.029s45.029-20.2,45.029-45.029
                                                                    C417.658,423.028,397.458,402.828,372.63,402.828z M372.63,467.742c-10.966,0-19.887-8.922-19.887-19.887
                                                                    c0-10.966,8.922-19.887,19.887-19.887c10.966,0,19.887,8.922,19.887,19.887C392.517,458.822,383.595,467.742,372.63,467.742z"
                                                            ></path>
                                                        </g>
                                                    </g>
                                                    <g>
                                                        <g>
                                                            <path
                                                                d="M383.716,165.755H203.567c-6.943,0-12.571,5.628-12.571,12.571c0,6.943,5.629,12.571,12.571,12.571h180.149
			                                                        c6.943,0,12.571-5.628,12.571-12.571C396.287,171.382,390.659,165.755,383.716,165.755z"
                                                            ></path>
                                                        </g>
                                                    </g>
                                                    <g>
                                                        <g>
                                                            <path
                                                                d="M373.911,231.035H213.373c-6.943,0-12.571,5.628-12.571,12.571s5.628,12.571,12.571,12.571h160.537
			                                                        c6.943,0,12.571-5.628,12.571-12.571C386.481,236.664,380.853,231.035,373.911,231.035z"
                                                            ></path>
                                                        </g>
                                                    </g>
                                                    <g>
                                                        <g>
                                                            <path
                                                                d="M506.341,109.744c-4.794-5.884-11.898-9.258-19.489-9.258H95.278L87.37,62.097c-1.651-8.008-7.113-14.732-14.614-17.989
                                                                l-55.177-23.95c-6.37-2.767-13.773,0.156-16.536,6.524c-2.766,6.37,0.157,13.774,6.524,16.537L62.745,67.17l60.826,295.261
                                                                c2.396,11.628,12.752,20.068,24.625,20.068h301.166c6.943,0,12.571-5.628,12.571-12.571c0-6.943-5.628-12.571-12.571-12.571
                                                                H148.197l-7.399-35.916H451.69c11.872,0,22.229-8.44,24.624-20.068l35.163-170.675
                                                                C513.008,123.266,511.136,115.627,506.341,109.744z M451.69,296.301H135.619l-35.161-170.674l386.393,0.001L451.69,296.301z"
                                                            ></path>
                                                        </g>
                                                    </g>
                                                    <g></g>
                                                    <g></g>
                                                    <g></g>
                                                    <g></g>
                                                    <g></g>
                                                    <g></g>
                                                    <g></g>
                                                    <g></g>
                                                    <g></g>
                                                    <g></g>
                                                    <g></g>
                                                    <g></g>
                                                    <g></g>
                                                    <g></g>
                                                    <g></g>
                                                </svg>
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
            </nav>
            <nav
                className="navbar__bottom py-1 d-none d-md-block position-relative"
                style={{ zIndex: "11" }}
            >
                <div className="container">
                    <div className="row">
                        <div className="col-11">
                            <div className="navbar__bottom-menu d-flex align-items-center gap-5">
                                <div className="navbar__bottom-links">
                                    <div className="d-flex align-items-center py-1 gap-3">
                                        <NavLink
                                            to="/"
                                            className="d-flex gap-2 align-items-center"
                                        >
                                            <BiHomeAlt size="1.1rem" />
                                            {t("home")}
                                        </NavLink>
                                        <NavLink
                                            to="/categories"
                                            className="d-flex gap-2 align-items-center"
                                            onMouseEnter={(e) => {
                                                let elm =
                                                    document.querySelector(
                                                        ".navbar__bottom-menu-dropdown"
                                                    );
                                                elm.classList.add("visible");
                                            }}
                                        >
                                            <BiCategoryAlt size="1.1rem" />
                                            {t("all_categories")}
                                        </NavLink>
                                        <NavLink
                                            to="/products"
                                            className="d-flex gap-2 align-items-center"
                                        >
                                            <MdStorefront size="1.1rem" />
                                            {t("all_products")}
                                        </NavLink>
                                        <NavLink
                                            to="/brands"
                                            className="d-flex gap-2 align-items-center"
                                        >
                                            <AiOutlineSafetyCertificate size="1.1rem" />
                                            {t("all_brands")}
                                        </NavLink>
                                        <NavLink
                                            className="d-flex gap-2 align-items-center"
                                            to="/contact-us"
                                        >
                                            <BsTelephone size="1.1rem" />
                                            {t("contact_us")}
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-1 d-flex align-items-center">
                            <div className="dropdown">
                                <Link
                                    role="button"
                                    className="dropdown-toggle bg-transparent d-flex align-items-center text-white"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    {i18n.language === "en" ? (
                                        <img
                                            src={enFlag}
                                            alt="EN"
                                            width="25"
                                            className="mx-1"
                                        />
                                    ) : (
                                        <img
                                            src={arFlag}
                                            alt="AR"
                                            width="25"
                                            className="mx-1"
                                        />
                                    )}
                                </Link>
                                <ul
                                    className="dropdown-menu shadow"
                                    style={{ minWidth: "0" }}
                                >
                                    <li className="text-center">
                                        <Link
                                            className="dropdown-item d-flex justify-content-center gap-3"
                                            role="button"
                                            onClick={() =>
                                                i18n.changeLanguage("ar")
                                            }
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
                                            className="dropdown-item d-flex justify-content-center gap-3"
                                            role="button"
                                            onClick={() =>
                                                i18n.changeLanguage("en")
                                            }
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
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <div
                className="navbar__bottom-menu-dropdown"
                onMouseLeave={(e) => {
                    let elm = document.querySelector(
                        ".navbar__bottom-menu-dropdown"
                    );
                    elm.classList.remove("visible");
                }}
            >
                {categories.length > 0 ? (
                    <div>
                        <div className="tab">
                            {categories.map((cat) => {
                                if (cat.parent === null) {
                                    return cat.children_count !== 0 ? (
                                        <button
                                            key={`tablink_${cat.id}`}
                                            className="tablinks"
                                            onMouseOver={(event) =>
                                                openTab(event, cat.slug)
                                            }
                                        >
                                            {cat?.name}
                                        </button>
                                    ) : (
                                        <button
                                            key={`tablink_${cat.id}`}
                                            className="tablinks"
                                            onMouseOver={(event) =>
                                                openTab(event, "no_categories")
                                            }
                                        >
                                            {cat?.name}
                                        </button>
                                    );
                                }
                                return null;
                            })}
                        </div>

                        <div
                            id="no_categories"
                            key="tabcontent_no_categories"
                            className="tabcontent"
                        >
                            <div className="mt-4 w-100 position-relative text-center">
                                <p>{t("no_categories")}</p>
                            </div>
                        </div>

                        {uniqueParentSlugs.map((parentSlug) => {
                            const filteredCategories = categories.filter(
                                (cat) =>
                                    cat.parent_slug === parentSlug &&
                                    cat.name
                                        .toLowerCase()
                                        .includes(searchQuery.toLowerCase())
                            );

                            return (
                                <div
                                    id={parentSlug}
                                    key={`tabcontent_${parentSlug}`}
                                    className="tabcontent"
                                >
                                    <div className="mt-2 mb-3 w-100 position-relative">
                                        <IoSearchSharp
                                            className="chat__search-icon"
                                            size="1.6rem"
                                        />
                                        <input
                                            type="text"
                                            className="form-control chat__search-input"
                                            placeholder={`${t(
                                                "header.search"
                                            )}...`}
                                            value={searchQuery}
                                            onChange={(e) => {
                                                setSearchQuery(e.target.value);
                                            }}
                                        />
                                    </div>

                                    {filteredCategories.length > 0 ? (
                                        filteredCategories.map((cat) => (
                                            <Link
                                                className="ca d-flex flex-column align-items-center gap-3"
                                                key={`category_${cat.id}`}
                                                to={`/products?category=${cat.parent_slug}&sub-category=${cat.slug}`}
                                                style={{
                                                    padding: "10px",
                                                    background: "white",
                                                    borderRadius: "15px",
                                                }}
                                            >
                                                <img
                                                    src={
                                                        import.meta.env
                                                            .VITE_BACKEND_URL +
                                                        cat?.image
                                                    }
                                                    alt="Cat Image"
                                                    className="rounded-circle object-fit-cover"
                                                    width={80}
                                                    height={80}
                                                />
                                                <span className="text-dark">
                                                    {cat?.name}
                                                </span>
                                            </Link>
                                        ))
                                    ) : (
                                        <div
                                            className="text-center"
                                            style={{
                                                gridColumn: "1 / span 4",
                                            }}
                                        >
                                            {t("no_categories")}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <p className="text-center" id="no_categories_msg">
                        {t("no_categories")}!
                    </p>
                )}
            </div>
        </header>
    );
};

const openTab = (evt, categoryName) => {
    let i, tabcontent, tablinks, cat;

    // Hide all tab contents
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Remove "active" class from all tab links
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Display the selected tab content
    cat = document.getElementById(categoryName);

    if (cat) {
        cat.style.display = "grid";
        cat.style.gridTemplateColumns = "repeat(4, 1fr)";
        cat.style.justifyItems = "center";
        cat.style.alignContent = "start";
        cat.style.rowGap = "15px";

        if (cat) {
            cat.style.display = "grid";
            cat.style.gridTemplateColumns = "repeat(4, 1fr)";
            cat.style.justifyItems = "center";
            cat.style.alignContent = "start";
            cat.style.rowGap = "15px";

            // Add "active" class to the clicked tab link
            evt.currentTarget.className += " active";

            // Set the first child element (search input) to occupy the entire row width
            const firstChild = cat.firstElementChild;

            firstChild.style.gridColumn = "1 / span 4";
        }
    }
};

export default Header;
