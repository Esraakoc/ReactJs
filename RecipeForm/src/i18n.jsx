import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import enTranslation from "./en.json";
import trTranslation from "./tr.json";
// import LanguageDetector from 'i18next-browser-languagedetector';

// npm install i18next-browser-languagedetector

i18n
  .use(initReactI18next)
  //.use(LanguageDetector)
  .init({
    resources: {
      en: {translation: enTranslation},
      tr: {translation: trTranslation},
    },
    lng: localStorage.getItem("language") || "tr", // localStorage'ta kayıtlı dil veya varsayılan olarak 'tr'
    fallbackLng: "tr",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
