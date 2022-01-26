function Titulo() {
	return (
		<h1>Boas Vindas de Volta!</h1>
	)
}

function HomePage() {
	return (
		<div>
			<Titulo>Boas Vindas de Volta!</Titulo>
			<h2>Discord - Alura Matrix</h2>
			<style jsx> {`
				h1 {
					color: red;
				}
			`} </style>
		</div>
	)
}

export default HomePage
