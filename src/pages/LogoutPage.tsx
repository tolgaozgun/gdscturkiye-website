import { Center, Stack, Text } from '@mantine/core';
import { useLogout } from '../hooks/auth';
import LogoutLottie from '../components/common/other/LogoutLottie';
import { useQuery } from '@tanstack/react-query';
import CheckLottie from '../components/common/other/CheckLottie';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

interface LoadingPageProps {
	message?: string;
}

const LogoutPage = ({ message }: LoadingPageProps) => {
	const { t } = useTranslation();

	const {logout} = useLogout();
	const navigate = useNavigate();
	let loggedOut = false;

	const res = useQuery({
		queryKey: ['logout'],
		queryFn: () => logout(),
	});

	if (res?.data) {
		message = t('pages:loading:success');
		setTimeout(() => {
			navigate(0)
			navigate("/")
		}, 3000);
		loggedOut = true;
	}

	return (
		<Center sx={{ height: '72vh' }}>
			<Stack align="center">
				{
					!loggedOut && <LogoutLottie />
				}
				{
					loggedOut && <CheckLottie />
				}
				<Text size={22} color="blue">
					{' '}
					{message || t('pages:loading:message')}
				</Text>
			</Stack>
		</Center>
	);
};

export default LogoutPage;
