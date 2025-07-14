import NewsCard from "./NewsCard";
import Navbar from "./Navbar";

const Home = () => {
	return (
		<div>
			<Navbar/>
			<div className="grid grid-cols-12 container mx-auto">
				<div className="container mx-auto p-4 col-span-3">
					<h3 className="text-xl font-bold">Suscripciones</h3>
					<ul className="py-4">
						<li className="text-neutral-700">Sub 1</li>
						<li className="text-neutral-700">Sub 2</li>
					</ul>
				</div>
				<div className="container mx-auto p-4 col-span-9">
					<h2 className="text-3xl font-black">Tus nuevas noticias</h2>
					<NewsCard />
				</div>
			</div>
		</div>
	)
}

export default Home;