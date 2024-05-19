import { useContext } from "react";

import { Link } from "react-router-dom";

import AuthContext from "../../../context/AuthContext";

import userImage from "../../../assets/images/user.png";

import { RiMenuLine, RiMenu3Line, RiMenu2Line } from "react-icons/ri";
import { BiLogOut, BiUserCircle } from "react-icons/bi";

import { useTranslation } from "react-i18next";
import { Label } from "react-aria-components";

const Header = (props) => {
    const { t, i18n } = useTranslation();

    const { user, logoutUser } = useContext(AuthContext);

    const { menuOpen, setMenuOpen } = props;

    return (
        <nav className="navbar fixed-top px-2 dashboard__navbar-container">
            <div className="tw-flex tw-gap-2">
                <Link
                    className="navbar-brand fw-bold supplier__header-brand [&&]:tw-mx-0"
                    to="/supplier/dashboard"
                >
                    Medex Supplier
                </Link>
                <Label
                    className={
                        "tw-h-fit tw-rounded-full tw-bg-purple tw-px-2 tw-py-1 tw-font-poppins tw-text-xs tw-text-white"
                    }
                >
                    Beta
                </Label>
            </div>
            <ul
                className={`navbar navbar-nav d-flex flex-row py-0 ${
                    i18n.resolvedLanguage == "en" ? "ms-auto" : "me-auto"
                }`}
            >
                <li
                    className="nav-item"
                    onClick={() => setMenuOpen(!menuOpen)}
                    style={{ cursor: "pointer", height: "25px" }}
                >
                    <div
                        className="dashboard__sidebar-toggle"
                        style={{ cursor: "pointer", fontSize: "25px" }}
                    >
                        {menuOpen ? (
                            <RiMenu3Line size="1.3rem" />
                        ) : (
                            <RiMenuLine size="1.3rem" />
                        )}
                    </div>
                </li>
                <li className="nav-item dropdown">
                    <Link
                        role="button"
                        className="d-flex align-items-center px-3 text-decoration-none nav-link dropdown-toggle"
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
                            className="rounded-circle mx-1 object-fit-cover"
                        />
                        <span className="d-none d-md-block text-dark">
                            {user?.full_name}
                        </span>
                    </Link>
                    <ul className="dropdown-menu text-small shadow">
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
