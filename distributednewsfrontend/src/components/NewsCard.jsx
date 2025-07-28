const NewsCard = ( {noticia} ) => {
	return (
		<div className="w-full py-4 shadow-md p-5 mb-5 rounded-sm">
			<h3 className="font-bold">{noticia.title}</h3>
			<p className="font-light text-sm text-neutral-700">{noticia.desc}</p>
		</div>
	)
}

export default NewsCard;