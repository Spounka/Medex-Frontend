import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai"
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ComingSoon = () => {
    const {t, i18n} = useTranslation();
  return (
    <main className="px-0 px-md-3">
      <section>
        <div className="container-xxl">
          <Link
            to="../../settings"
            className="d-flex align-items-center"
            style={{ color: "#8e65c1" }}
          >
            {i18n.resolvedLanguage == "en" ? <AiOutlineArrowLeft className="mb-2" /> : <AiOutlineArrowRight className="mb-2" /> }
            {" "}
            <h5 className="fw-normal">{t("supplier_pages.setting.back")}</h5>{" "}
          </Link>
          <div className="main-body">
            <div className="row">
              <h4>{t("supplier_pages.setting.soon")}</h4>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
export default ComingSoon;
