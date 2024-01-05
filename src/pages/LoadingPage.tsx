import { Center, Stack, Text } from '@mantine/core';
import ScreenLoadingLottie from '../components/common/other/LoadingLottie';
import { useTranslation } from 'react-i18next';

interface LoadingPageProps {
	message?: string;
}

const LoadingPage = ({ message }: LoadingPageProps) => {
	const { t } = useTranslation();
	return (
		<Center sx={{ height: '72vh' }}>
			<Stack align="center">
				<ScreenLoadingLottie />
				<Text size={22} color="blue">
					{' '}
					{message || t('pages:loading:message')}
				</Text>
			</Stack>
		</Center>
	);
};

export default LoadingPage;
