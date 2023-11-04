import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import { Notifications } from '@mantine/notifications';

interface ProviderWrapperProps {
	children: React.ReactNode;
}

const ProviderWrapper = ({ children }: ProviderWrapperProps) => {
	const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
		key: 'mantine-color-scheme',
		defaultValue: 'light',
		getInitialValueInEffect: true,
	});

	const toggleColorScheme = (value?: ColorScheme) => {
		setColorScheme(value || colorScheme === 'light' ? 'dark' : 'light');
	};

	// Shortcut for toggling theme is: CTRL + J
	useHotkeys([['mod+J', () => toggleColorScheme()]]);

	return (
		<ColorSchemeProvider
			colorScheme={colorScheme}
			toggleColorScheme={toggleColorScheme}
		>
			<MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
				<Notifications position="bottom-left" style={{ color: 'green' }} />
				{children}
			</MantineProvider>
		</ColorSchemeProvider>
	);
};

export default ProviderWrapper;
