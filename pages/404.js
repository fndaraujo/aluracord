import { Box, Text } from '@skynexui/components';
import appConfig from '../config.json';

export default function Custom404() {
	return (
		<>
			<Box
				styleSheet = {{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					flexDirection: {
						xs: 'column',
						sm: 'row',
					},
					width: '100%',
					minWidth: '180px',
					backgroundColor: appConfig.theme.colors.primary['000'],
					color: appConfig.theme.colors.neutrals['400'],
				}}
			>
				<Text
					styleSheet = {{
						fontSize: '58px',
						fontWeight: 'bold',
					}}
				>
					404
				</Text>
				<Text
					styleSheet = {{
						marginLeft: '18px',
						fontSize: '18px',
						fontWeight: 'bold',
					}}
				>
					OH NO! You reached an inexistent space!
				</Text>
			</Box>
		</>
	)
}
