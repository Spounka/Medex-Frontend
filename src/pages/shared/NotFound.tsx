import { Link } from "react-router-dom";
import notFoundBackgroundImage from "../../assets/images/404.jpg";
import { useTranslation } from "react-i18next";

const NotFound = () => {
    const { t } = useTranslation();
    return (
        <main>
            <section>
                <div id="notfound">
                    <div className="notfound">
                        <div className="notfound-404">
                            <h1
                                style={{
                                    backgroundImage: `url("${notFoundBackgroundImage}")`,
                                }}
                            >
                                Oops!
                            </h1>
                        </div>
                        <h2>404 - {t("shared.not_found.title")}</h2>
                        <p>{t("shared.not_found.info")}.</p>
                        <Link to="/">{t("shared.not_found.link")}</Link>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default NotFound;
