import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React from 'react';
import { useRouter } from 'next/router';
import appConfig from '../config.json';

function Title(props) {
	const Tag = props.tag || 'h1';
	return (
		<>
			<Tag>{props.children}</Tag>
			<style jsx> {`
				${Tag} {
					color: ${appConfig.theme.colors.neutrals['400']};
					font-size: 44px;
					font-weight: 600;
				}
			`} </style>
		</>
	)
}

export default function HomePage() {
	const [username, setUsername] = React.useState('alura');
	const [image_src, setImageSrc] = React.useState(`https://github.com/${username}.png`);
	const routing = useRouter();
	return (
		<>
			<Box
				styleSheet={{
					display: 'flex', alignItems: 'center', justifyContent: 'center',
					backgroundColor: appConfig.theme.colors.primary['000']
				}}
			>
				<Box
					styleSheet={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						flexDirection: {
							xs: 'column',
							sm: 'row',
						},
						width: '100%', maxWidth: '700px',
						borderRadius: '5px', padding: '32px', margin: '16px',
						boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
						backgroundColor: appConfig.theme.colors.neutrals['000'],
					}}
				>
					{/* Formulário */}
					<Box
						as="form"
						onSubmit={function(event_submit) {
							event_submit.preventDefault();
							routing.push(`/chat?username=${username}`);
						}}
						styleSheet={{
							display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
							width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
						}}
					>
					<Title tag="h2">Boas vindas de volta!</Title>
					<Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals['300'] }}>
					{appConfig.name}
					</Text>

					<TextField
						value={username}
						onChange={function(event) {
							const input_value = event.target.value;
							setUsername(input_value);
							if (event.target.value.length > 2) {
								setImageSrc(`https://github.com/${event.target.value}.png`);
							} else {
								setImageSrc('');
							}
						}}
						fullWidth
						textFieldColors={{
							neutral: {
							  textColor: appConfig.theme.colors.neutrals['400'],
							  mainColor: appConfig.theme.colors.neutrals['300'],
							  mainColorHighlight: appConfig.theme.colors.primary['400'],
							  backgroundColor: appConfig.theme.colors.neutrals['000'],
							},
						}}
					/>
					<Button
						type='submit'
						label='Entrar'
						fullWidth
						buttonColors={{
							contrastColor: appConfig.theme.colors.neutrals['000'],
							mainColor: appConfig.theme.colors.primary['100'],
							mainColorLight: appConfig.theme.colors.primary['100'],
							mainColorStrong: appConfig.theme.colors.primary['400'],
						}}
					/>
					</Box>
					{/* Formulário */}


					{/* Photo Area */}
					<Box
						styleSheet={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							maxWidth: '200px',
							padding: '16px',
							backgroundColor: appConfig.theme.colors.neutrals['000'],
							border: '1px solid',
							borderColor: appConfig.theme.colors.neutrals['100'],
							borderRadius: '10px',
							flex: 1,
							minHeight: '240px',
						}}
					>
						<Image
							styleSheet={{
							borderRadius: '50%',
							marginBottom: '16px',
							}}
							src={image_src}
						/>
						<Text
							variant="body4"
							styleSheet={{
								color: appConfig.theme.colors.neutrals['300'],
								backgroundColor: appConfig.theme.colors.neutrals['000'],
								padding: '3px 10px',
								border: '1px solid',
								borderColor: appConfig.theme.colors.neutrals['100'],
								borderRadius: '1000px'
							}}
						>
						{username}
						</Text>
					</Box>
					{/* Photo Area */}
				</Box>
			</Box>
		</>
	)
}
