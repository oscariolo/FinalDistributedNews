
import { Search, Bell, Newspaper } from 'lucide-react'
import { Link } from 'react-router';

const Navbar = () => {
	return (
		<nav className="flex justify-between  shadow-md p-3">
			{/* Parte izquierda */}
			<div className="flex mx-8 gap-6 items-center">
				<div className='flex items-center'>
					<Newspaper/>
					<Link className="text-2xl font-bold">NewsFeed</Link>
				</div>
				
				<Link className='hover:border-b-1 border-black' >Inicio</Link>
				<Link className='hover:border-b-1 border-black' >Explorar</Link>
				<Link className='hover:border-b-1 border-black' >Suscripciones</Link>
			</div>

			{/* Parte derecha */}
			<div className="flex mx-8 gap-5 items-center">
				{/* Barra de busqueda */}
				<div className="flex items-center border-1 border-white bg-neutral-200 rounded-xl px-2 hover:border-neutral-600">
					<Search size={20}/>
					<input type='text' placeholder='Buscar' className='p-1 outline-0'></input>
				</div>
				{/* Notificaciones */}
				<div className='flex border-1 border-white bg-neutral-200 rounded-full w-9 h-9 justify-center items-center hover:bg-neutral-400 hover:cursor-pointer'>
					<Bell size={20}/>
				</div>
				{/* Avatar usuario */}
				<div className='flex border-1 border-white rounded-full w-9 h-9 justify-center items-center bg-neutral-200 hover:bg-neutral-400 hover:cursor-pointer'>
					<p>JO</p>
				</div>
			</div>
			
		</nav>
	)
}

export default Navbar;