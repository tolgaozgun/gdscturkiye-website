
import {
    IconGauge,
    IconAdjustments,
    IconSchool,
    IconUsersGroup,
    IconFlag,
    IconTree,
    IconChalkboard,
    IconBrandCampaignmonitor,
    IconQuestionMark,
    IconUserCircle,
    IconHome,
    IconConfetti,
  } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

const leadPanelData = () => {
  const { t } = useTranslation();


  return [
    { label: t("components:menus:navbar:leadPanel:backToHomePage"), icon: IconHome, link: '/' },
    { label: t('components:menus:navbar:leadPanel:dashboard'), icon: IconGauge, link: '/panel/lead/dashboard' },
    {
      label: t("components:menus:navbar:leadPanel:myCoreTeam"),
      link: '/panel/lead/core-team',
      icon: IconUsersGroup,
      links: [
        { label: t("components:menus:navbar:leadPanel:listUsers"), link: '/panel/lead/core-team/my' },
        { label: t("components:menus:navbar:leadPanel:inviteUser"), link: '/panel/lead/core-team/invite' },
      ],
    },
    {
      label: t("components:menus:navbar:leadPanel:myBuddyTeam"),
      link: '/panel/lead/buddy-teams',
      icon: IconChalkboard,
      links: [
        { label: t("components:menus:navbar:leadPanel:viewBuddyTeam"), link: '/panel/lead/buddy-teams/my' },
        { label: t("components:menus:navbar:leadPanel:attendance"), link: '/panel/lead/buddy-teams/attendance' },
        { label: t("components:menus:navbar:leadPanel:listAllBuddyTeams"), link: '/panel/lead/buddy-teams/all' },
      ],
    },
    {
      label: t("components:menus:navbar:leadPanel:events"),
      link: '/panel/lead/events',
      icon: IconConfetti,
      links: [
        { label: t("components:menus:navbar:leadPanel:myEvents"), link: '/panel/lead/events/my' },
        { label: t("components:menus:navbar:leadPanel:listAllEvents"),link: '/panel/lead/events/all' },
      ],
    },
    {
      label: t("components:menus:navbar:leadPanel:campaigns"),
      link: '/panel/lead/campaigns', 
      icon: IconBrandCampaignmonitor,
      links: [
        { label: t("components:menus:navbar:leadPanel:listCurrentCampaigns"), link: '/panel/lead/campaigns/current' },
        { label: t("components:menus:navbar:leadPanel:listAllCampaigns"), link: '/panel/lead/campaigns/all' },
      ],
    },
    {
      label: t("components:menus:navbar:leadPanel:leads"),
      link: '/panel/lead/leads',
      icon: IconUserCircle,
      links: [
        { label: t("components:menus:navbar:leadPanel:allLeads"), link: '/panel/lead/leads/all' },
      ],
    },
    {
      label: t("components:menus:navbar:leadPanel:universities"),
      link: '/panel/lead/universities',
      icon: IconSchool,
      links: [
        { label: t("components:menus:navbar:leadPanel:allUniversities"), link: '/panel/lead/universities/all' },
      ],
    },
    {
      label: t("components:menus:navbar:leadPanel:cities"),
      link: '/panel/lead/cities',
      icon: IconTree,
      links: [
        { label: t("components:menus:navbar:leadPanel:listCities"), link: '/panel/lead/cities/list' },
      ],
    },
    {
      label: t("components:menus:navbar:leadPanel:countries"),
      link: '/panel/lead/countries',
      icon: IconFlag,
      links: [
        { label: t("components:menus:navbar:leadPanel:listCountries"), link: '/panel/lead/countries/list' },
      ],
    },
    {
      label: t("components:menus:navbar:leadPanel:questions"),
      link: '/panel/lead/questions',
      icon: IconQuestionMark,
      links: [
        { label: t("components:menus:navbar:leadPanel:listQuestions"), link: '/panel/lead/questions/list' },
        { label: t("components:menus:navbar:leadPanel:askQuestion"), link: '/panel/lead/questions/ask' },
      ],
    },
    {
      label: t("components:menus:navbar:leadPanel:settings"),
      link: '/panel/lead/settings',
      icon: IconAdjustments,
      links: [
        { label: t("components:menus:navbar:leadPanel:userSettings"), link: '/panel/lead/settings/user' },
        { label: t("components:menus:navbar:leadPanel:leadSettings"), link: '/panel/lead/settings/lead' },
        { label: t("components:menus:navbar:leadPanel:preferences"), link: '/panel/lead/settings/preferences' },
      ],
    },
  ];

}

export default leadPanelData;