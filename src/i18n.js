// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';
// import LanguageDetector from 'i18next-browser-languagedetector';
// import translationEN from './Locales/En/translation.json';
// import translationAR from './Locales/Ar/translation.json';

// i18n
//   .use(LanguageDetector) // Detects language from cookies/localStorage
//   .use(initReactI18next) // Connects i18next with React
//   .init({
//     resources: {
//       en: { translation: translationEN },
//       ar: { translation: translationAR },
//     },
//     lng: 'en', // Set default language
//     fallbackLng: 'en', // Fallback language in case of missing translations
//     interpolation: {
//       escapeValue: false, // React already escapes values to prevent XSS
//     },
//   });

// export default i18n;

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationEN from './Locales/En/translation.json';
import translationAR from './Locales/Ar/translation.json';

const languageDetector = new LanguageDetector(null, {
  // Optionally configure the language detector options
  order: ['localStorage', 'navigator'], // Check localStorage first, then the browser
  caches: ['localStorage'],
});

i18n
  .use(languageDetector) // Detects language from cookies/localStorage
  .use(initReactI18next) // Connects i18next with React
  .init({
    resources: {
      en: { translation: translationEN },
      ar: { translation: translationAR },
    },
    lng: localStorage.getItem('language') || 'en', // Set default language from localStorage if available
    fallbackLng: 'en', // Fallback language in case of missing translations
    interpolation: {
      escapeValue: false, // React already escapes values to prevent XSS
    },
  });

export default i18n;
