import i18n from 'i18next';
import Backend from 'i18next-http-backend';
//import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
  // load translation using http -> see /public/locales
  // learn more: https://github.com/i18next/i18next-http-backend
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  //.use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: 'en',
    debug: true,
    preload: ['en', 'it'],
    lng: localStorage.getItem('lng') || 'en',
    ns: ['translation'],
    defaultNS: 'translation',
    saveMissing: true,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    interpolation: {
      format: function(value, format, lng) {
          if (format === 'uppercase') return value.toUpperCase();
          if (format === 'lowercase') return value.toLowerCase();
          return value;
      }
  }
  });

export default i18n;