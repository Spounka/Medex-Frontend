import { useTranslation } from "react-i18next";

export default () => {
    const { t } = useTranslation();

    return <h1>{t("shared.rfq.empty")}</h1>;
};
