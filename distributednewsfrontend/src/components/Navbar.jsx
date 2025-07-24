import { Search, Bell, Newspaper, LogOut, User } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [showUserMenu, setShowUserMenu] = useState(false);
    const menuRef = useRef(null);

    const linkClass = (path) =>
        `hover:border-b-2 border-black px-2 py-1 transition ${
            location.pathname === path ? "border-b-2 font-bold text-blue-700" : ""
        }`;

    const handleLogout = () => {
        // Aquí puedes agregar la lógica de logout
        console.log("Cerrando sesión...");
        // Por ejemplo: localStorage.clear(), eliminar tokens, etc.
        localStorage.clear(); // Limpia datos de sesión
        
        // Redirige a la página de login
        navigate('/login');
    };

    // Efecto para cerrar el menú al hacer clic fuera de él
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowUserMenu(false);
            }
        };

        // Agregar el event listener cuando el menú está abierto
        if (showUserMenu) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        // Cleanup: remover el event listener
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showUserMenu]);

    return (
        <nav className="flex justify-between shadow-md p-3">
            {/* Parte izquierda */}
            <div className="flex mx-8 gap-6 items-center">
                <div className='flex items-center'>
                    <Newspaper/>
                    <Link to="/" className="text-2xl font-bold">NewsFeed</Link>
                </div>
                <Link to="/" className={linkClass("/")}>Inicio</Link>
                <Link to="/explorar" className={linkClass("/explorar")}>Explorar</Link>
                <Link to="/suscripciones" className={linkClass("/suscripciones")}>Suscripciones</Link>
            </div>

            {/* Parte derecha */}
            <div className="flex mx-8 gap-5 items-center">
                {/* Notificaciones */}
                <div className='flex border-1 border-white bg-neutral-200 rounded-full w-9 h-9 justify-center items-center hover:bg-neutral-400 hover:cursor-pointer'>
                    <Bell size={20}/>
                </div>
                
                {/* Avatar usuario con menú desplegable */}
                <div className="relative" ref={menuRef}>
                    <div 
                        className='flex border-1 border-white rounded-full w-9 h-9 justify-center items-center bg-neutral-200 hover:bg-neutral-400 hover:cursor-pointer'
                        onClick={() => setShowUserMenu(!showUserMenu)}
                    >
                        <p>JO</p>
                    </div>
                    
                    {/* Menú desplegable */}
                    {showUserMenu && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border">
                            <div className="px-4 py-2 text-sm text-gray-700 border-b">
                                <div className="font-medium">Jonathan</div>
                                <div className="text-gray-500">jonathan@email.com</div>
                            </div>
                            <Link 
                                to="/perfil" 
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => setShowUserMenu(false)}
                            >
                                <User size={16} className="mr-2" />
                                Mi Perfil
                            </Link>
                            <button
                                onClick={() => {
                                    handleLogout();
                                    setShowUserMenu(false);
                                }}
                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                <LogOut size={16} className="mr-2" />
                                Cerrar Sesión
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar;