const Login = () => {
	return (
		<div className="flex flex-col min-h-dvh justify-center items-center">
			<h2 className="text-2xl font-semibold text-center">Iniciar Sesión en NewsFeed</h2>
			<form className="flex flex-col my-8 min-w-sm p-4 rounded-xl bg-neutral-100 shadow-md">
				<div className="flex flex-col gap-2 my-3">
					<label for="username" className="text-sm"> Usuario: </label>
					<input type="text" name="username" required placeholder="Ingrese su nombre de usuario" className="outline-0 bg-neutral-200 rounded-md p-1.5"/>
				</div>
				<div className="flex flex-col gap-2 my-3">
					<label for="password" className="text-sm"> Contraseña: </label>
					<input type="text" name="password" required placeholder="Ingrese su contraseña" className="outline-0 bg-neutral-200 rounded-md p-1.5" />
				</div>
				<button className="p-2 rounded-xl bg-green-400 my-3 cursor-pointer hover:bg-green-700">
					Iniciar Sesión
				</button>
			</form>
		</div>
	)
}

export default Login;