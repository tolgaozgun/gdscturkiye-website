
import {
	ActionIcon,
	Card,
	Flex,
	Group,
	Menu,
	Space,
	Text,
	Title,
	createStyles,
	rem,
    Image,
    Container,
    Stack,
} from '@mantine/core';
import { IconDots, IconEye, IconFileZip, IconTrash } from '@tabler/icons-react';
import { UserModel } from '../../types';
import { University } from '../../types/UniversityTypes';
import moment from 'moment';
import { withTheme } from '@emotion/react';

const useStyle = createStyles(theme => ({
	section: {
		padding: theme.spacing.md,
		borderTop: `${rem(1)} solid ${
			theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
		}`,
	},
}));

interface ProfileCardProps {
    user: UserModel;
    university: University;
    withBorder?: boolean;
}

export function ProfileCard({user, university, withBorder}: ProfileCardProps) {
	const { classes } = useStyle();

	return (
        <Group >
		<Card
            withBorder={withBorder}
            radius="md">
                <Image 
                    width={100}
                    height={100}
                    radius="xl"
                    src={user.profileImage} />

				<Space h="md" />

				<Flex direction="column">
					<Title order={5}>{user.name} {user.surname}</Title>
                    <Text fz="sm" fw="300">
                         {user.userType}
                    </Text>
					<Space h="xs" />
					<Text fz="sm" c="dimmed" fw="500">
						{user.email}
					</Text>
					<Space h="4" />
					<Text fz="sm" c="dimmed" fw="500">
                        {university.name}
					</Text>
				</Flex>
        </Card>
        
		<Card
        withBorder={withBorder}
        radius="md">
            {/* </Grid.Col> */}
            {/* <Grid.Col xs={12} md={6}> */}
                <Container>
                    <Text c="dimmed" tt="uppercase" fw={700} fz="xs">
                        Last Login
                    </Text>
                    <Text fw={700} fz="xl">
                        {user.lastLoginDate ? moment(user.lastLoginDate).fromNow(): 'Never'}
                    </Text>
                </Container>
                <Container mt={30}>
                    <Text c="dimmed" tt="uppercase" fw={700} fz="xs">
                        City
                    </Text>
                    <Text fw={700} fz="xl">
                        {university.city.name}
                    </Text>
                </Container>
                <Container mt={30}>
                    <Text c="dimmed" tt="uppercase" fw={700} fz="xs">
                        Country
                    </Text>
                    <Text fw={700} fz="xl">
                        {university.country.name}
                    </Text>
                </Container>
			</Card>
        </Group>
	);
}