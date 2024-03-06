import { Link } from "react-router-dom";

import { useTranslation } from "react-i18next";

const BreadCrumb = (props) => {
    const { t } = useTranslation();
    const { title } = props;

    return (
        <section className="breadcrumb mb-0">
            <div className="container-xxl">
                <div className="row">
                    <div className="col-12">
                        <div className="text-center mb-0">
                            <Link to="/" className="text-color-darkblue">
                                {t("home")} &nbsp;
                            </Link>
                            / {title}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BreadCrumb;
