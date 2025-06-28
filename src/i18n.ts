import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resources from './labels/labels';

i18n
    .use(LanguageDetector) // Automatically detect user's language
    .use(initReactI18next)
  .init({
    resources,
      fallbackLng: 'en', // Fallback language
      debug: process.env.NODE_ENV === 'development', // Debug only in development

      // Language detection options
      detection: {
          order: ['localStorage', 'navigator', 'htmlTag'],
          caches: ['localStorage'],
      },

      // Interpolation options
    interpolation: {
        escapeValue: false, // React already escapes values
    },

      // Performance optimizations
      react: {
          useSuspense: false, // Better for SSR
      },

      // Namespace options
      defaultNS: 'common',
      ns: ['common', 'home', 'about_me', 'portfolio', 'projects', 'header'],
  });

export default i18n;
