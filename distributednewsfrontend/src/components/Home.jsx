import NewsCard from "./NewsCard";
import Navbar from "./Navbar";

//simulacion de datos
const usuario = {nombre: "Santiago"};
const noticias = [
  { id: 1, titulo: "Nueva función en la app", descripcion: "Ahora puedes guardar noticias.", fecha: "2025-07-16" },
  { id: 2, titulo: "Actualización de seguridad", descripcion: "Mejoras en la protección de datos.", fecha: "2025-07-15" },
];
const suscripcionesActivas = 2;

const Home = () => {
	return (
		<div>
			<Navbar/>
			<div className="container mx-auto p-8">
				{/*saludos y estadisticas*/ }
				<div className="mb-8">
					<h1 className="text-2xl font-bold mb-2">!Bienvenido, {usuario.nombre}¡</h1>
					<div className="flex gap-8 text-lg">
					 <span>
						<span className="font-semibold">{noticias.length}</span> noticias nuevas	
					 </span>
					 <span>
						<span className="font-semibold">{suscripcionesActivas}</span> suscripciones activas
					 </span>
					</div>
				</div>
				{/*Noticias recientes*/ }
				<div>
					<h2 className="text-xl font-bold mb-4">Noticias Recientes</h2>
					{noticias.length === 0 ? (
						<div> No hay noticias nuevas.</div>
					) : (
						noticias.map(noticia => (
							<NewsCard key={noticia.id} noticia={noticia} />
						))
					)}
				</div>
			</div>
		</div>
	);
};

export default Home;