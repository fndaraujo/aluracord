import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js';
import { ButtonSendSticker } from '../src/components/ButtonSendSticker';

const SUPABASE_ANON_KEY = '';
const SUPABASE_URL = '';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function ListenMessageRealTime(addMessage) {
	return supabase
		.from('mensagens')
		.on('INSERT', (res_live) => {
			addMessage(res_live.new)
		})
		.subscribe();
}

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
	const subscription = ListenMessageRealTime((new_message) => {
		setMessageList((current_message_list) => {
			return [
				new_message,
				...current_message_list
			]
		});
		return () => {
			subscription.unsubscribe();
		}
	}, []);
	function HandleNewMessage(current_message) {
		const message = {
			//id: messageList.length,
			de: login_user,
			texto: current_message,
		};
		supabase
			.from('mensagens')
			.insert([
				message
			])
			.then(({ data }) => {
				//setMessageList([
					//data[0],
					//...messageList
				//]);
				console.log('Create message: ' + data);
			});
		//setMessage(data);
		setMessage('');
	}
	return (
		<Box
			styleSheet={{
				display: 'flex', alignItems: 'center', justifyContent: 'center',
				backgroundColor: appConfig.theme.colors.primary['000'],
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
					<ButtonSendSticker
						onStickerClick = { (sticker) => {
							HandleNewMessage(':sticker: ' + sticker);
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
			<Box styleSheet={{
					width: '100%',
					marginBottom: '16px',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between'
				}}
			>
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
						overflowWrap: 'anywhere',
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
						src={`https://github.com/${message.de}.png`}
					/>
					<Text tag="strong">
						{message.de}
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
						{message.texto.startsWith(':sticker:') ?
								(<Image src={message.texto.replace(':sticker:', '')}/>)
							:
								(message.texto)
						}
					</Text>
					)
		})}

		</Box>
	)
}
