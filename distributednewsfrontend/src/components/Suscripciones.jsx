import { useState } from "react";
import NewsCard from "./NewsCard";
import Navbar from "./Navbar";

// Simulación de datos
const topicosSuscritosIniciales = [
  { id: 1, nombre: "Tecnología" },
  { id: 2, nombre: "Deportes" },
  { id: 3, nombre: "Ciencia" },
  { id: 4, nombre: "Tecnología Médica" },
  { id: 5, nombre: "Deportes Extremos" },
];

const noticiasPorTopico = {
  1: [
    { id: 101, titulo: "Nuevo chip revolucionario", descripcion: "Detalles sobre el nuevo chip.", fecha: "2025-07-17" },
    { id: 102, titulo: "Avances en IA", descripcion: "La inteligencia artificial sigue creciendo.", fecha: "2025-07-16" },
  ],
  2: [
    { id: 201, titulo: "Final de la Champions", descripcion: "Resultados y análisis.", fecha: "2025-07-15" },
  ],
  3: [
    { id: 301, titulo: "Descubrimiento en Marte", descripcion: "Nueva evidencia de agua.", fecha: "2025-07-14" },
  ],
  4: [
    { id: 401, titulo: "Robots quirúrgicos", descripcion: "Nueva tecnología médica avanzada.", fecha: "2025-07-13" },
  ],
  5: [
    { id: 501, titulo: "Escalada extrema", descripcion: "Nuevas rutas de montaña.", fecha: "2025-07-12" },
  ],
};

const SidebarSuscripciones = ({ 
  topicos, 
  seleccionado, 
  setSeleccionado, 
  terminoBusqueda, 
  setTerminoBusqueda,
  onDesuscribirse 
}) => {
  const [tooltip, setTooltip] = useState(null);

  // Filtrar tópicos basado en el término de búsqueda
  const topicosFiltrados = topicos.filter(topico =>
    topico.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase())
  );

  const handleDesuscribirse = (e, topicoId, nombreTopico) => {
    e.stopPropagation(); // Evitar que se seleccione el tópico
    
    const confirmacion = window.confirm(
      `¿Estás seguro de que quieres desuscribirte de ${nombreTopico}?`
    );
    
    if (confirmacion) {
      onDesuscribirse(topicoId);
    }
  };

  return (
    <div className="w-full md:w-64 border-r p-4">
      <h3 className="text-xl font-bold mb-4">Tus suscripciones</h3>
      
      {/* Input de búsqueda local en sidebar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar tópicos..."
          value={terminoBusqueda}
          onChange={(e) => setTerminoBusqueda(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg text-sm"
        />
      </div>

      <ul>
        {topicosFiltrados.length === 0 ? (
          <li className="text-gray-500 text-sm">No se encontraron tópicos</li>
        ) : (
          topicosFiltrados.map(topico => (
            <li
              key={topico.id}
              className={`cursor-pointer p-2 rounded mb-2 flex justify-between items-center group ${
                seleccionado === topico.id ? "bg-blue-100 font-semibold" : "hover:bg-gray-100"
              }`}
              onClick={() => setSeleccionado(topico.id)}
            >
              <span>{topico.nombre}</span>
              
              {/* Botón de desuscripción - solo aparece en el seleccionado */}
              {seleccionado === topico.id && (
                <div className="relative">
                  <button
                    onClick={(e) => handleDesuscribirse(e, topico.id, topico.nombre)}
                    onMouseEnter={() => setTooltip(topico.id)}
                    onMouseLeave={() => setTooltip(null)}
                    className="w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold transition-colors"
                  >
                    −
                  </button>
                  
                  {/* Tooltip */}
                  {tooltip === topico.id && (
                    <div className="absolute right-0 bottom-8 bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                      Desuscribirse
                      <div className="absolute top-full right-2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-800"></div>
                    </div>
                  )}
                </div>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

const NoticiasSuscripcion = ({ noticias, topicoSeleccionado, topicos }) => {
  const nombreTopico = topicos.find(t => t.id === topicoSeleccionado)?.nombre || "";
  
  return (
    <div className="flex-1 p-4">
      <h2 className="text-2xl font-bold mb-4">
        {nombreTopico ? `Noticias de ${nombreTopico}` : "Selecciona un tópico"}
      </h2>
      {noticias.length === 0 ? (
        <div>No hay noticias para este tópico.</div>
      ) : (
        noticias.map(noticia => <NewsCard key={noticia.id} noticia={noticia} />)
      )}
    </div>
  );
};

const Suscripciones = () => {
  const [topicosSuscritos, setTopicosSuscritos] = useState(topicosSuscritosIniciales);
  const [topicoSeleccionado, setTopicoSeleccionado] = useState(topicosSuscritos[0]?.id || null);
  const [terminoBusqueda, setTerminoBusqueda] = useState("");

  const handleDesuscribirse = (topicoId) => {
    // Eliminar el tópico de la lista de suscripciones
    const nuevasSuscripciones = topicosSuscritos.filter(topico => topico.id !== topicoId);
    setTopicosSuscritos(nuevasSuscripciones);
    
    // Si el tópico desuscrito era el seleccionado, seleccionar el primero disponible
    if (topicoSeleccionado === topicoId) {
      setTopicoSeleccionado(nuevasSuscripciones[0]?.id || null);
    }
    
    console.log(`Desuscrito del tópico con ID: ${topicoId}`);
  };

  return (
    <div>
      <Navbar />
      <div className="flex h-full min-h-[80vh]">
        <SidebarSuscripciones
          topicos={topicosSuscritos}
          seleccionado={topicoSeleccionado}
          setSeleccionado={setTopicoSeleccionado}
          terminoBusqueda={terminoBusqueda}
          setTerminoBusqueda={setTerminoBusqueda}
          onDesuscribirse={handleDesuscribirse}
        />
        <NoticiasSuscripcion 
          noticias={noticiasPorTopico[topicoSeleccionado] || []} 
          topicoSeleccionado={topicoSeleccionado}
          topicos={topicosSuscritos}
        />
      </div>
    </div>
  );
};

export default Suscripciones;