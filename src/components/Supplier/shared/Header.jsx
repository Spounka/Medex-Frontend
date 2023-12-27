import { useContext } from "react";

import { Link } from "react-router-dom";

import AuthContext from "../../../context/AuthContext";

import userImage from "../../../assets/images/user.png";

import { RiMenuUnfoldFill, RiMenuFoldFill } from "react-icons/ri";
import { BiLogOut, BiUserCircle } from "react-icons/bi";

import { useTranslation } from "react-i18next";

const Header = (props) => {
    const { t, i18n } = useTranslation();

    const { user, logoutUser } = useContext(AuthContext);

    const { menuOpen, setMenuOpen } = props;

    return (
        <nav className="navbar fixed-top px-5 dashboard__navbar-container">
            <Link
                className="navbar-brand fw-bold supplier__header-brand"
                to="/supplier/dashboard"
            >
                Medex Supplier
            </Link>
            <ul
                className={`navbar navbar-nav d-flex flex-row py-0 ${
                    i18n.resolvedLanguage == "en" ? "ms-auto" : "me-auto"
                }`}
            >
                <li className="nav-item" onClick={() => setMenuOpen(!menuOpen)}>
                    <div
                        className={`btn btn-primary btn-sm shadow ${
                            menuOpen
                                ? "dashboard__sidebar-toggle-visible"
                                : "dashboard__sidebar-toggle"
                        }`}
                    >
                        {menuOpen ? (
                            <RiMenuFoldFill size="1.3rem" />
                        ) : (
                            <RiMenuUnfoldFill size="1.3rem" />
                        )}
                    </div>
                </li>
                <li className="nav-item dropdown">
                    <Link
                        role="button"
                        className="d-flex align-items-center gap-0 gap-md-2 px-3 text-decoration-none nav-link dropdown-toggle"
                        id="dropdownUser1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        <img
                            src={
                                user?.profile_picture
                                    ? import.meta.env.VITE_BACKEND_URL +
                                      user?.profile_picture
                                    : userImage
                            }
                            alt="User"
                            width="35"
                            height="35"
                            className="rounded-circle"
                        />
                        <span className="d-none d-md-block text-dark">
                            {user?.full_name}
                        </span>
                    </Link>
                    <ul className="dropdown-menu text-small shadow">
                        <li>
                            <Link
                                className="dropdown-item d-flex align-items-center gap-1"
                                to="/supplier/account/profile"
                            >
                                <BiUserCircle size="1.5rem" />
                                {t("header.your_profile")}
                            </Link>
                        </li>
                        <li>
                            <Link
                                role="button"
                                onClick={logoutUser}
                                className="dropdown-item d-flex align-items-center gap-1"
                            >
                                <BiLogOut size="1.5rem" />
                                {t("logout")}
                            </Link>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
    );
};

export default Header;
