import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import Backend, { HttpBackendOptions } from "i18next-http-backend";

i18n.use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init<HttpBackendOptions>({
        debug: false,
        lng: "en",
        fallbackLng: ["en", "ar"],
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
