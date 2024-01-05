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
import notFoundPageEN from './locales/en/pages/not_found_page.json';
import notFoundPageTR from './locales/tr/pages/not_found_page.json';
import mainPageEN from './locales/en/pages/main_page.json';
import mainPageTR from './locales/tr/pages/main_page.json';
import appHeaderEN from './locales/en/components/headers/app_header.json';
import appHeaderTR from './locales/tr/components/headers/app_header.json';
import leadPanelDashboardPageEN from './locales/en/pages/panel/lead/dashboard_page.json';
import leadPanelDashboardPageTR from './locales/tr/pages/panel/lead/dashboard_page.json';
import leadPanelBuddyTeamsPageEN from './locales/en/pages/panel/lead/buddy_teams_page.json';
import leadPanelBuddyTeamsPageTR from './locales/tr/pages/panel/lead/buddy_teams_page.json';
import leadPanelAttendancePageEN from './locales/en/pages/panel/lead/attendance_page.json';
import leadPanelAttendancePageTR from './locales/tr/pages/panel/lead/attendance_page.json';
import leadPanelBuddyTeamPageEN from './locales/en/pages/panel/lead/buddy_team_page.json';
import leadPanelBuddyTeamPageTR from './locales/tr/pages/panel/lead/buddy_team_page.json';
import leadPanelLeadListPageEN from './locales/en/pages/panel/lead/lead_list_page.json';
import leadPanelLeadListPageTR from './locales/tr/pages/panel/lead/lead_list_page.json';
import leadPanelDataEN from './locales/en/components/menus/navbar/lead_panel_data.json';
import leadPanelDataTR from './locales/tr/components/menus/navbar/lead_panel_data.json';
import profileCardEN from './locales/en/components/cards/profile_card.json';
import profileCardTR from './locales/tr/components/cards/profile_card.json';

const resources = {
  en: {
    components: {
        forms: {
            register: registerFormEN,
            login: loginformEN,
            sendEmailVerification: sendEmailVerificationFormEN,
            verifyEmail: verifyEmailFormEN
        },
        headers: {
            app: appHeaderEN
        },
        menus: {
          navbar: {
            leadPanel: leadPanelDataEN
          }
        },
        cards: {
          profile: profileCardEN
        }
    },
    pages: {
      loading: loadingPageEN,
      logout: logoutPageEN,
      notFound: notFoundPageEN,
      main: mainPageEN,
      panel: {
        lead: {
          dashboard: leadPanelDashboardPageEN,
          buddyTeams: leadPanelBuddyTeamsPageEN,
          attendance: leadPanelAttendancePageEN,
          buddyTeam: leadPanelBuddyTeamPageEN,
          leadList: leadPanelLeadListPageEN
        }
      }
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
        headers: {
            app: appHeaderTR
        },
        menus: {
          navbar: {
            leadPanel: leadPanelDataTR
          }
        },
        cards: {
          profile: profileCardTR
        }
    },
    pages: {
      loading: loadingPageTR,
      logout: logoutPageTR,
      notFound: notFoundPageTR,
      main: mainPageTR,
      panel: {
        lead: {
          dashboard: leadPanelDashboardPageTR,
          buddyTeams: leadPanelBuddyTeamsPageTR,
          attendance: leadPanelAttendancePageTR,
          buddyTeam: leadPanelBuddyTeamPageTR,
          leadList: leadPanelLeadListPageTR
        }
      }
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
