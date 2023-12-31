import {
  Group,
  Paper,
  SimpleGrid,
  createStyles,
  Text,
  Card,
  Progress,
  Grid,
} from "@mantine/core";
import { PageContainer } from "../../../components/PageContainer";
import { ProfileCard } from "../../../components/cards/ProfileCard";
import { OverviewCard } from "../../../components/cards/OverviewCard";
import useGetLeadDashboard from "../../../hooks/user/useGetLeadDashboard";
import useAxiosSecure from "../../../hooks/auth/useAxiosSecure";
import LoadingLottie from "../../../components/common/other/LoadingLottie";
import useGetEventsByCurrentUserUniversity from "../../../hooks/event/useGetEventsByCurrentUserUniversity";
import { Activity } from "../../../types/EventTypes";
import { useTranslation } from "react-i18next";

const useStyles = createStyles((theme) => ({
  root: {
    padding: `calc(${theme.spacing.xl} * 1.5)`,
  },

  label: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

const LeadDashboardPage = () => {
  const axiosSecure = useAxiosSecure();
  const { classes } = useStyles();
  const { t } = useTranslation();

  const {
    data: dashboardData,
    isLoading: isDashboardLoading,
    // isError: isUniversitiesError,
  } = useGetLeadDashboard(axiosSecure);

  const {
    data: eventsData,
    // isLoading: isEventsLoading,
    // isError: isUniversitiesError,
  } = useGetEventsByCurrentUserUniversity(axiosSecure);

  let data = [
    {
      title: t("pages:panel:lead:dashboard:buddyTeamSize"),
      value: t("pages:panel:lead:dashboard:unableToRetrieveData"),
    },
    {
      title: t("pages:panel:lead:dashboard:totalActivitiesCompleted"),
      value: t("pages:panel:lead:dashboard:unableToRetrieveData"),
    },
    {
      title: t("pages:panel:lead:dashboard:timeAsLeader"),
      value: t("pages:panel:lead:dashboard:unableToRetrieveData"),
    },
    {
      title: t("pages:panel:lead:dashboard:coreTeamSize"),
      value: t("pages:panel:lead:dashboard:unableToRetrieveData"),
    },
    {
      title: t("pages:panel:lead:dashboard:upcomingEvents"),
      value: t("pages:panel:lead:dashboard:unableToRetrieveData"),
    },
    {
      title: t("pages:panel:lead:dashboard:totalBuddyTeamMeetings"),
      value: t("pages:panel:lead:dashboard:unableToRetrieveData"),
    },
  ];
  let labels = [
    t("pages:panel:lead:dashboard:months:september"),
    t("pages:panel:lead:dashboard:months:october"),
    t("pages:panel:lead:dashboard:months:november"),
    t("pages:panel:lead:dashboard:months:december"),
    t("pages:panel:lead:dashboard:months:january"),
    t("pages:panel:lead:dashboard:months:february"),
    t("pages:panel:lead:dashboard:months:march"),
    t("pages:panel:lead:dashboard:months:april"),
    t("pages:panel:lead:dashboard:months:may"),
    t("pages:panel:lead:dashboard:months:june"),
    t("pages:panel:lead:dashboard:months:july"),
    t("pages:panel:lead:dashboard:months:august")
  ];
  let monthlyEventCount = 0;
  let noOfBuddyTeamMeetings = 0;
  let totalAttendance = 0;
  let datasetEvents = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let datasetAttendances = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  if (dashboardData?.data) {
    // today's date
    const today = new Date();
    let pastEvents: Activity[] = [];
    const currentMonth = today.getMonth();
    let futureEvents: Activity[] = [];

    if (eventsData?.data) {
      // seperate dashboardData.data.eventDates into past and future events
      pastEvents = eventsData.data.filter((event) => {
        return new Date(event.startDate) < today;
      });

      futureEvents = eventsData.data.filter((event) => {
        return new Date(event.startDate) >= today;
      });

      monthlyEventCount = eventsData.data.filter((event) => {
        return new Date(event.startDate).getMonth() === currentMonth;
      }).length;

      // get the number of events in each month starting from september
      datasetEvents = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      datasetAttendances = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      eventsData.data.forEach((event) => {
        const month = new Date(event.startDate).getMonth();
        datasetEvents[(month - 8) % 12]++;
      });
    }

    if (
      dashboardData.data.buddyMeetings &&
      dashboardData.data.buddyMeetings instanceof Map
    ) {
      // get the number of attended meetings in each month starting from september
      dashboardData.data.buddyMeetings.forEach(
        (attended: boolean, date: Date) => {
          noOfBuddyTeamMeetings++;
          if (!attended) return;
          const month = new Date(date).getMonth();
          datasetAttendances[(month - 8) % 12]++;
          totalAttendance++;
        }
      );
    }

    data = [
      {
        title: t("pages:panel:lead:dashboard:buddyTeamSize"),
        value: dashboardData.data.buddyTeamSize
          ? dashboardData.data.buddyTeamSize.toString()
          : t("pages:panel:lead:dashboard:notInBuddyTeam"),
      },
      {
        title: t("pages:panel:lead:dashboard:totalActivitiesCompleted"),
        value: pastEvents.length.toString(),
      },
      {
        title: t("pages:panel:lead:dashboard:timeAsLeader"),
        value: dashboardData.data.promotedAt
          ? dashboardData.data.promotedAt.toString()
          : t("pages:panel:lead:dashboard:notFound"),
      },
      {
        title: t("pages:panel:lead:dashboard:coreTeamSize"),
        value: dashboardData.data.coreTeamSize.toString(),
      },
      {
        title: t("pages:panel:lead:dashboard:upcomingEvents"),
        value: futureEvents.length.toString(),
      },
      {
        title: t("pages:panel:lead:dashboard:totalBuddyTeamMeetings"),
        value: noOfBuddyTeamMeetings.toString(),
      },
    ];
  }

  const dataEvents = {
    labels,
    datasets: [
      {
        label: t("pages:panel:lead:dashboard:eventsLabel"),
        data: datasetEvents,
        tension: 0.4,
        borderColor: "#3BC9DB",
        backgroundColor: "#3BC9DB",
      },
    ],
  };

  const dataAbsences = {
    labels,
    datasets: [
      {
        label: t("pages:panel:lead:dashboard:absencesLabel"),
        data: datasetAttendances,
        tension: 0.4,
        borderColor: "#FF8C00",
        backgroundColor: "#FF8C00",
      },
    ],
  };

  const options = {
    responsive: true,
    smooth: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  const stats = data.map((stat) => {
    return (
      <Paper withBorder p="md" radius="md" key={stat.title}>
        <Group position="apart">
          <div>
            <Text
              c="dimmed"
              tt="uppercase"
              fw={700}
              fz="xs"
              className={classes.label}
            >
              {stat.title}
            </Text>
            <Text fw={700} fz="xl">
              {stat.value}
            </Text>
          </div>
        </Group>
      </Paper>
    );
  });

  if (isDashboardLoading || !dashboardData) {
    return <LoadingLottie />;
  }

  return (
    <PageContainer 
      title={t("pages:panel:lead:dashboard:dashboardTitle")}>
      <div className={classes.root}>
        <Grid>
          <Grid.Col xs={12} md={6}>
            <ProfileCard
              user={dashboardData?.data?.lead?.user!}
              university={dashboardData?.data?.lead?.university!}
              withBorder
            />
          </Grid.Col>
          <Grid.Col xs={12} md={6}>
            <Card
              withBorder
              radius="md"
              padding="xl"
              sx={(theme) => ({
                backgroundColor:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[7]
                    : theme.white,
              })}
            >
              <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
              {t("pages:panel:lead:dashboard:monthlyRequiredActivitiesCompleted")}
              </Text>
              <Text fz="lg" fw={500}>
                {monthlyEventCount} / 2
              </Text>
              <Progress
                value={monthlyEventCount / 2}
                mt="md"
                size="lg"
                radius="xl"
              />
            </Card>
            <Card
              withBorder
              radius="md"
              mt="sm"
              padding="xl"
              sx={(theme) => ({
                backgroundColor:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[7]
                    : theme.white,
              })}
            >
              <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
              {t("pages:panel:lead:dashboard:weeklyBuddyTeamMeetingsAttended")}
              </Text>
              <Text fz="lg" fw={500}>
                {totalAttendance} / {noOfBuddyTeamMeetings}
              </Text>
              <Progress
                value={totalAttendance / noOfBuddyTeamMeetings}
                mt="md"
                size="lg"
                radius="xl"
              />
            </Card>
          </Grid.Col>
        </Grid>
        <SimpleGrid
          cols={3}
          mt="md"
          breakpoints={[{ maxWidth: "sm", cols: 1 }]}
        >
          {stats}

          <OverviewCard
            withBorder
            data={dataEvents}
            options={options}
            name={t("pages:panel:lead:dashboard:pastEvents")}
          />
          <OverviewCard
            withBorder
            data={dataAbsences}
            options={options}
            name={t("pages:panel:lead:dashboard:buddyTeamMeetingAttendances")}
          />
          <OverviewCard
            withBorder
            data={dataEvents}
            options={options}
            name={t("pages:panel:lead:dashboard:upcomingEvents")}
          />
        </SimpleGrid>
      </div>
    </PageContainer>
  );
};

export default LeadDashboardPage;
