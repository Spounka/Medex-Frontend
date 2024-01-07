import { BsTelephone, BsEnvelopeAt } from "react-icons/bs";
import { FiMapPin } from "react-icons/fi";

import { Link } from "react-router-dom";

import { useContext } from "react";
import AuthContext from "../../../context/AuthContext";

import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t, i18n } = useTranslation();
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <footer>
      <div className="py-4">
        <div className="container">
          <div className="row">
            <div className="col-6 col-md-4">
              <h4 className="mb-4">{t("contact_us")}</h4>
              <div className="d-flex flex-column">
                <address className="d-flex align-items-center gap-2">
                  <FiMapPin />
                  {t("footer.company_address")}
                  <br />
                  {t("footer.company_city_country")}
                </address>
                {i18n.language === "en" ? (
                  <a
                    href="tel:+966 072222297"
                    className="my-1 text-white d-flex align-items-center gap-2 footer__top-link"
                  >
                    <BsTelephone />
                    +966 072222297
                  </a>
                ) : (
                  <a
                    href="tel:+966 072222297"
                    className="my-1 text-white d-flex align-items-center gap-2 footer__top-link"
                  >
                    <BsTelephone />
                    ٩٦٦٠٧٢٢٢٢٢٩٧+
                  </a>
                )}

                <a
                  href="mailto:test@test.com"
                  className="my-1 text-white d-flex align-items-center gap-2 footer__top-link"
                >
                  <BsEnvelopeAt />
                  test@test.com
                </a>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <h4 className="mb-4">{t("footer.quick_links")}</h4>
              <div className="d-flex flex-column">
                <Link to="/" className="text-white footer__top-link py-1 mb-1">
                  {t("home")}
                </Link>
                <Link
                  to="/categories"
                  className="text-white footer__top-link py-1 mb-1"
                >
                  {t("all_categories")}
                </Link>
                <Link
                  to="/brands"
                  className="text-white footer__top-link py-1 mb-1"
                >
                  {t("all_brands")}
                </Link>
                <Link
                  to="/products"
                  className="text-white footer__top-link py-1 mb-1"
                >
                  {t("all_products")}
                </Link>
                <Link
                  to="/contact-us"
                  className="text-white footer__top-link py-1 mb-1"
                >
                  {t("contact_us")}
                </Link>
              </div>
            </div>
            <div className="col-6 col-md-3 mt-5 mt-md-0">
              <h4 className="mb-4">{t("account")}</h4>
              <div className="d-flex flex-column">
                {!user ? (
                  <>
                    <Link
                      to="/account/login"
                      className="text-white footer__top-link py-1 mb-1"
                    >
                      {t("footer.buyer_login")}
                    </Link>
                    <Link
                      to="/account/register"
                      className="text-white footer__top-link py-1 mb-1"
                    >
                      {t("footer.buyer_register")}
                    </Link>
                  </>
                ) : user.is_buyer ? (
                  <>
                    <Link
                      to="/account/dashboard"
                      className="text-white footer__top-link py-1 mb-1"
                    >
                      {t("dashboard")}
                    </Link>
                    <Link
                      role="button"
                      onClick={logoutUser}
                      className="text-white footer__top-link py-1 mb-1"
                    >
                      {t("logout")}
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/supplier/dashboard"
                      className="text-white footer__top-link py-1 mb-1"
                    >
                      {t("dashboard")}
                    </Link>
                    <Link
                      role="button"
                      onClick={logoutUser}
                      className="text-white footer__top-link py-1 mb-1"
                    >
                      {t("logout")}
                    </Link>
                  </>
                )}
              </div>
            </div>
            {!user && (
              <div className="col-6 col-md-2 mt-5 mt-md-0">
                <h4 className="mb-4">{t("supplier")}</h4>
                <div className="d-flex flex-column">
                  <Link
                    to="/account/login"
                    className="text-white footer__top-link py-1 mb-1"
                  >
                    {t("footer.supplier_login")}
                  </Link>
                  <Link
                    to="/supplier/account/register"
                    className="text-white footer__top-link py-1 mb-1"
                  >
                    {t("footer.supplier_register")}
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="py-2 pb-5 mb-4 mb-md-0 pb-md-2 footer__bottom">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="text-center">
                <span>
                  &copy; {new Date().getFullYear()}; Medex.
                  {t("copy")}.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
