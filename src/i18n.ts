import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Define resources for RU and UZ (Latin)
const resources = {
   ru: {
      translation: {
         "welcome": "Добро пожаловать в UMA",
         "description": "B2B Платформа для турагентов",
      }
   },
   uz: {
      translation: {
         "welcome": "UMA-ga xush kelibsiz",
         "description": "Turagentlar uchun B2B platformasi",
      }
   }
};

i18n
   .use(initReactI18next)
   .init({
      resources,
      lng: "ru", // default language
      fallbackLng: "ru",
      interpolation: {
         escapeValue: false // React already escapes values
      }
   });

export default i18n;
