import { createStyles, Title, Text, Button, Container, Group, rem } from '@mantine/core';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: rem(80),
    paddingBottom: rem(80),
  },

  label: {
    textAlign: 'center',
    fontWeight: 900,
    fontSize: rem(220),
    lineHeight: 1,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2],

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(120),
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: 'center',
    fontWeight: 900,
    fontSize: rem(38),

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(32),
    },
  },

  description: {
    maxWidth: rem(500),
    margin: 'auto',
    marginTop: theme.spacing.xl,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
  },
}));

const NotFoundPage = () => {
  const { t } = useTranslation();
  const { classes } = useStyles();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  }

  return (
    <Container className={classes.root}>
      <div className={classes.label}>
        {t('pages:notFound:error404')}
      </div>
      <Title className={classes.title}>
        {t('pages:notFound:secretPlaceTitle')}
      </Title>
      <Text color="dimmed" size="lg" align="center" className={classes.description}>
        {t('pages:notFound:errorDescription')}
      </Text>
      <Group position="center">
        <Button variant="subtle" size="md" onClick={handleClick}>
          {t("pages:notFound:backToHomePage")}
        </Button>
      </Group>
    </Container>
  );
}

export default NotFoundPage