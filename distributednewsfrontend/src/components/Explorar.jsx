import { useState } from "react";
import Navbar from "./Navbar"; // <-- Importa la Navbar

// Simulación de datos
const todosLosTopicos = [
  { id: 1, nombre: "Tecnología", descripcion: "Últimas noticias sobre avances tecnológicos." },
  { id: 2, nombre: "Deportes", descripcion: "Resultados y novedades deportivas." },
  { id: 3, nombre: "Ciencia", descripcion: "Descubrimientos y estudios recientes." },
  { id: 4, nombre: "Economía", descripcion: "Tendencias y análisis económicos." },
];

const suscripcionesUsuario = [1, 3]; // IDs de tópicos a los que ya está suscrito

const Explorar = () => {
  const [suscripciones, setSuscripciones] = useState(suscripcionesUsuario);

  // Filtrar tópicos a los que NO está suscrito
  const topicosDisponibles = todosLosTopicos.filter(
    topico => !suscripciones.includes(topico.id)
  );

  // Función para suscribirse a un tópico
  const suscribirse = (id) => {
    setSuscripciones([...suscripciones, id]);
  };

  return (
    <div>
      <Navbar /> {/* <-- Agrega la Navbar aquí */}
      <div className="container mx-auto p-8">
        <h1 className="text-2xl font-bold mb-6">Explorar tópicos</h1>
        {topicosDisponibles.length === 0 ? (
          <div>Ya estás suscrito a todos los tópicos disponibles.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {topicosDisponibles.map(topico => (
              <div key={topico.id} className="border rounded-lg p-4 flex justify-between items-center shadow">
                <div>
                  <h2 className="font-semibold text-lg">{topico.nombre}</h2>
                  <p className="text-gray-600">{topico.descripcion}</p>
                </div>
                <button
                  className="bg-green-500 hover:bg-green-600 text-white rounded-full w-10 h-10 text-2xl flex items-center justify-center"
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