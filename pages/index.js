function Title(props) {
	return (
		<h1>{props.children}</h1>
		<style jsx> {`
			h1 {
				color: red;
			}
		`} </style>
	)
}

function HomePage() {
	return (
		<div>
			<Title>Boas Vindas de Volta!</Title>
			<h2>Discord - Alura Matrix</h2>
		</div>
	)
}

export default HomePage
