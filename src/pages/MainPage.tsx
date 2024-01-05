import HeroComponent from "../components/HeroComponent";
import HeroBg from "../assets/heroBg.jpg";
import UniversitiesMap from "../components/maps/UniversitiesMap";
import { Center, Container, Title, Text, Stack } from "@mantine/core";
import VerticalImageGrid from "../components/VerticalImageGrid";
import ActivitiesCarousel from "../components/ActivitesCarousel";
import useGetUniversities from "../hooks/university/useGetUniversities";
import { University } from "../types/UniversityTypes";
import { useTranslation } from "react-i18next";

const MainPage = () => {
  const { t } = useTranslation();
  const { data: universitiesData, isLoading: isUniversitiesLoading } =
    useGetUniversities();

  let universities: University[] = [] as University[];
  if (universitiesData && universitiesData?.data) {
    universities = universitiesData?.data!;
  }

  return (
    <>
      <HeroComponent
        bg={HeroBg}
        title={t("pages:main:heroTitle")}
        description={t("pages:main:heroDescription")}
        buttons={[t("pages:main:heroSignInButton"), t("pages:main:heroLearnMoreButton")]}
      />

      <Container mt={30} mb={30} size="xl">
        <Center>
          <Stack>
            <Title mb={10} align="center" weight={700} size={40}>
              {t("pages:main:universitiesSectionTitle")}
            </Title>
            <Text size={20} mb={20}>
              {t("pages:main:universitiesSectionDescription")}
            </Text>
          </Stack>
        </Center>
        <UniversitiesMap
          isLoading={isUniversitiesLoading}
          universities={universities}
        />
      </Container>

      <Container mt={30} mb={30}>
        <Center>
          <Stack>
            <Title mb={20} align="center" weight={700} size={40}>
              {t("pages:main:upcomingActivitiesTitle")}
            </Title>
          </Stack>
        </Center>
        <ActivitiesCarousel />
      </Container>

      <Container mt={30} mb={30}>
        <Center>
          <Stack>
            <Title mb={20} align="center" weight={700} size={40}>
              {t("pages:main:galleryTitle")}
            </Title>
          </Stack>
        </Center>
        <VerticalImageGrid />
      </Container>
    </>
  );
};

export default MainPage;
