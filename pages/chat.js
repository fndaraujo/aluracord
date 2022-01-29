import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_ANON_KEY = '';
const SUPABASE_URL = '';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function Chat() {
	const router = useRouter();
	const login_user = router.query.username;
	const [message, setMessage] = React.useState('');
	const [messageList, setMessageList] = React.useState([]);
	React.useEffect(() => {
		supabase
			.from('mensagens')
			.select('*')
			.order('id', { ascending: false })
			.then(({ data }) => {
				setMessageList(data);
			});
	}, []);
	function HandleNewMessage(current_message) {
		const message = {
			//id: messageList.length,
			from: login_user,
			text: current_message,
		};
		supabase
			.from('mensagens')
			.insert([
				message
			])
			.then(({ data }) => {
				setMessageList([
					data[0],
					...messageList
				]);
				console.log('Create message: ' + data);
			});
		setMessage('');
	}
	return (
		<Box
			styleSheet={{
				display: 'flex', alignItems: 'center', justifyContent: 'center',
				backgroundColor: appConfig.theme.colors.primary['400'],
				backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)`,
				backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
				color: appConfig.theme.colors.neutrals['400']
			}}
		>
		<Box
			styleSheet={{
				display: 'flex',
				flexDirection: 'column',
				flex: 1,
				boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
				borderRadius: '5px',
				backgroundColor: appConfig.theme.colors.neutrals['000'],
				height: '100%',
				maxWidth: '95%',
				maxHeight: '95vh',
				padding: '32px',
			}}
		>
			<Header />
				<Box
					styleSheet={{
						position: 'relative',
						display: 'flex',
						flex: 1,
						height: '80%',
						backgroundColor: appConfig.theme.colors.neutrals['300'],
						flexDirection: 'column',
						borderRadius: '5px',
						padding: '16px',
					}}
				>

					<MessageList messages={messageList} />

					<Box
						as="form"
						styleSheet={{
							display: 'flex',
							alignItems: 'center',
						}}
					>
					<TextField
						value={message}
						onChange={function (event) {
							const value = event.target.value;
							setMessage(value);
						}}
						onKeyPress={function (event) {
							if (event.key === 'Enter') {
								event.preventDefault();
								HandleNewMessage(message);
							}
						}}
						placeholder="Insira sua mensagem aqui..."
						type="textarea"
						styleSheet={{
							width: '100%',
							border: '0',
							resize: 'none',
							borderRadius: '5px',
							padding: '6px 8px',
							backgroundColor: appConfig.theme.colors.neutrals['400'],
							marginRight: '12px',
							color: appConfig.theme.colors.neutrals['000'],
						}}
					/>
					</Box>
				</Box>
			</Box>
		</Box>
	)
}

function Header() {
	return (
		<>
			<Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
				<Text variant='heading5'>
					Chat
				</Text>
				<Button
					variant='tertiary'
					colorVariant='neutral'
					label='Logout'
					href="/"
				/>
			</Box>
		</>
	)
}

function MessageList(props) {
	return (
		<Box
			tag="ul"
			styleSheet={{
				overflow: 'scroll',
				display: 'flex',
				flexDirection: 'column-reverse',
				flex: 1,
				color: appConfig.theme.colors.neutrals['000'],
				marginBottom: '16px',
			}}
		>

		{props.messages.map((message) => {
			return (
				<Text
					key={message.id}
					tag="li"
					styleSheet={{
						borderRadius: '5px',
						padding: '6px',
						marginBottom: '12px',
						hover: {
							backgroundColor: appConfig.theme.colors.neutrals['400'],
						}
					}}
				>
				<Box
					styleSheet={{
						marginBottom: '8px',
					}}
				>
					<Image
						styleSheet={{
							width: '20px',
							height: '20px',
							borderRadius: '50%',
							display: 'inline-block',
							marginRight: '8px',
						}}
						src={`https://github.com/${message.from}.png`}
					/>
					<Text tag="strong">
						{message.from}
					</Text>
					<Text
						styleSheet={{
							fontSize: '10px',
							marginLeft: '8px',
							color: appConfig.theme.colors.neutrals['100'],
						}}
						tag="span"
					>
						{(new Date().toLocaleDateString())}
					</Text>
					</Box>
						{message.text}
					</Text>
					)
		})}

		</Box>
	)
}
