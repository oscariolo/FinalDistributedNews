import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import NewsCard from "./NewsCard";

const Home = () => {
    // Obtener datos del usuario del localStorage
    const fullName = localStorage.getItem('fullName') || '';
    const username = localStorage.getItem('username') || '';
    const token = localStorage.getItem('authToken');

    // Usar fullName si existe, sino usar username, sino "Usuario"
    const displayName = fullName || username || "Usuario";

    // // Datos simulados de noticias
    // const [noticias] = useState([
    //     {
    //         id: 1,
    //         titulo: "Breakthrough en Inteligencia Artificial",
    //         descripcion: "Un nuevo modelo de AI revoluciona el procesamiento de lenguaje natural...",
    //         fecha: "2025-01-15"
    //     },
    //     {
    //         id: 2,
    //         titulo: "Descubrimiento en Medicina",
    //         descripcion: "Científicos desarrollan una nueva terapia génica...",
    //         fecha: "2025-01-14"
    //     },
    //     {
    //         id: 3,
    //         titulo: "Avances en Tecnología Verde",
    //         descripcion: "Nueva tecnología de paneles solares aumenta eficiencia...",
    //         fecha: "2025-01-13"
    //     }
    // ]);

    const [suscripcionesActivas, setSuscripcionesActivas] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchSubs = async () => {
            try {
                // Obtener datos del usuario
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/username/${username}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const json = await response.json();
                setSuscripcionesActivas(json.subs.length);
                setLoading(false);

            } catch (error) {
                console.log(error);
                setLoading(false);
                setError(true);
            }
        }

        fetchSubs();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-lg text-gray-600">Cargando ...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-lg text-gray-600">Something gone wrong!!. Please contact with an administrator. </p>
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <div className="container mx-auto p-8">
                {/* Saludos y estadísticas */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold mb-2">¡Bienvenido, {displayName}!</h1>
                    <div className="flex gap-8 text-lg">
                        <span>
                            <span className="font-semibold">{noticias.length}</span> noticias nuevas
                        </span>
                        <span>
                            <span className="font-semibold">{suscripcionesActivas}</span> suscripciones activas
                        </span>
                    </div>
                </div>

                {/* Noticias recientes */}
                {/* <div>
                    <h2 className="text-xl font-bold mb-4">Noticias Recientes</h2>
                    {noticias.length === 0 ? (
                        <div>No hay noticias nuevas.</div>
                    ) : (
                        noticias.map(noticia => (
                            <NewsCard key={noticia.id} noticia={noticia} />
                        ))
                    )}
                </div> */}
            </div>
        </div>
    );
};

export default Home;