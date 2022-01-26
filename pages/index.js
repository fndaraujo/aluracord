function Title(props) {
	const Tag = props.tag
	return (
		<>
			<Tag>{props.children}</Tag>
			<style jsx> {`
				${Tag} {
					color: red;
					font-size: 44px;
					font-weight: 600;
				}
			`} </style>
		</>
	)
}

function HomePage() {
	return (
		<div>
			<GlobalStyle />
			<Title tag="h1">Boas Vindas de Volta!</Title>
			<h2>Discord - Alura Matrix</h2>
		</div>
	)
}

export default HomePage
