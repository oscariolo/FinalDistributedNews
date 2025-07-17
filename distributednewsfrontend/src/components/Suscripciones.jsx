import { useState } from "react";
import NewsCard from "./NewsCard";
import Navbar from "./Navbar"; // <-- Importa la Navbar

// Simulación de datos
const topicosSuscritos = [
  { id: 1, nombre: "Tecnología" },
  { id: 2, nombre: "Deportes" },
  { id: 3, nombre: "Ciencia" },
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
};

const SidebarSuscripciones = ({ topicos, seleccionado, setSeleccionado }) => (
  <div className="w-full md:w-64 border-r p-4">
    <h3 className="text-xl font-bold mb-4">Tus suscripciones</h3>
    <ul>
      {topicos.map(topico => (
        <li
          key={topico.id}
          className={`cursor-pointer p-2 rounded mb-2 ${seleccionado === topico.id ? "bg-blue-100 font-semibold" : "hover:bg-gray-100"}`}
          onClick={() => setSeleccionado(topico.id)}
        >
          {topico.nombre}
        </li>
      ))}
    </ul>
  </div>
);

const NoticiasSuscripcion = ({ noticias }) => (
  <div className="flex-1 p-4">
    <h2 className="text-2xl font-bold mb-4">Noticias en vivo</h2>
    {noticias.length === 0 ? (
      <div>No hay noticias para este tópico.</div>
    ) : (
      noticias.map(noticia => <NewsCard key={noticia.id} noticia={noticia} />)
    )}
  </div>
);

const Suscripciones = () => {
  const [topicoSeleccionado, setTopicoSeleccionado] = useState(topicosSuscritos[0]?.id || null);

  return (
    <div>
      <Navbar /> {/* <-- Agrega la Navbar aquí */}
      <div className="flex h-full min-h-[80vh]">
        <SidebarSuscripciones
          topicos={topicosSuscritos}
          seleccionado={topicoSeleccionado}
          setSeleccionado={setTopicoSeleccionado}
        />
        <NoticiasSuscripcion noticias={noticiasPorTopico[topicoSeleccionado] || []} />
      </div>
    </div>
  );
};

export default Suscripciones;