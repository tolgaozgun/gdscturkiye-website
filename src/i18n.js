import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import registerFormEN from './locales/en/components/forms/register_form.json';
import registerFormTR from './locales/tr/components/forms/register_form.json';
import loginformEN from './locales/en/components/forms/login_form.json';
import loginformTR from './locales/tr/components/forms/login_form.json';
import sendEmailVerificationFormEN from './locales/en/components/forms/send_email_verification_form.json';
import sendEmailVerificationFormTR from './locales/tr/components/forms/send_email_verification_form.json';
import verifyEmailFormEN from './locales/en/components/forms/verify_email_form.json';
import verifyEmailFormTR from './locales/tr/components/forms/verify_email_form.json';
import loadingPageEN from './locales/en/pages/loading_page.json';
import loadingPageTR from './locales/tr/pages/loading_page.json';
import logoutPageEN from './locales/en/pages/logout_page.json';
import logoutPageTR from './locales/tr/pages/logout_page.json';

const resources = {
  en: {
    components: {
        forms: {
            register: registerFormEN,
            login: loginformEN,
            sendEmailVerification: sendEmailVerificationFormEN,
            verifyEmail: verifyEmailFormEN
        },
    },
    pages: {
      loading: loadingPageEN,
      logout: logoutPageEN
    }
  },
  tr: {
    components: {
        forms: {
            register: registerFormTR,
            login: loginformTR,
            sendEmailVerification: sendEmailVerificationFormTR,
            verifyEmail: verifyEmailFormTR
        },
    },
    pages: {
      loading: loadingPageTR,
      logout: logoutPageTR
    }
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'tr',
    fallbackLng: 'tr',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
