import { useEffect, useState } from "react";
import Navbar from "./Navbar";

const Explorar = () => {
  const fullName = localStorage.getItem('fullName') || '';
  const username = localStorage.getItem('username') || '';
  const token = localStorage.getItem('authToken');
  console.log(token)

  const [todosLosTopicos, setTodosLosTopicos] = useState(null);
  const [suscripcionesUsuario, setSuscripcionesUsuario] = useState([]);
  const [suscripciones, setSuscripciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch suscripciones del usuario
  useEffect(() => {
    const fetchSubs = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/username/${username}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const json = await response.json();
        setSuscripcionesUsuario(json.subs || []);
      } catch (error) {
        console.log(error);
        setError(true);
      }
    };

    fetchSubs();
  }, [username, token]);

  // Actualiza las suscripciones internas cuando se recuperan las del usuario
  useEffect(() => {
    setSuscripciones(suscripcionesUsuario);
  }, [suscripcionesUsuario]);

  // Fetch todos los tópicos
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/topics`);
        const json = await response.json();
        setTodosLosTopicos(json);
      } catch (error) {
        console.error('Error fetching topics', error);
        alert("Error cargando los tópicos. Intenta nuevamente.");
      } finally {
        setLoading(false);
      }
    };
    fetchTopics();
  }, []);

  // Filtrar tópicos disponibles (a los que NO está suscrito)
  const topicosDisponibles = todosLosTopicos
    ? todosLosTopicos.filter(topico => !suscripciones.some(sub => sub.id === topico.id))
    : [];

  console.log(topicosDisponibles)

  const suscribirse = async (topicId) => {
    console.log(topicId);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/topic/${topicId}`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "Error al suscribirse");
      }

      // Actualizar suscripciones localmente si fue exitoso
      const topico = todosLosTopicos.find(t => t.id === topicId);
      if (topico) {
        setSuscripciones(prev => [...prev, topico]);
      }

      alert(`Te has suscrito al tópico "${topico.topicName}"`);

    } catch (err) {
      console.error("Error al suscribirse:", err.message);
      alert(`Error al suscribirse: ${err.message}`);
    }
  };


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
        <p className="text-lg text-red-600">Error cargando los datos del usuario.</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-8">
        <h1 className="text-2xl font-bold mb-6">Explorar tópicos</h1>
        {topicosDisponibles.length === 0 ? (
          <div>Ya estás suscrito a todos los tópicos disponibles.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {topicosDisponibles.map(topico => (
              <div key={topico.id} className="border rounded-lg p-4 flex justify-between items-center shadow">
                <div>
                  <h2 className="font-semibold text-lg">{topico.topicName}</h2>
                </div>
                <button
                  className="bg-green-500 hover:bg-green-600 text-white rounded-full w-10 h-10 text-2xl flex justify-center"
                  onClick={() => suscribirse(topico.id)}
                  title={`Suscribirse a ${topico.nombre}`}
                >
                  +
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Explorar;
