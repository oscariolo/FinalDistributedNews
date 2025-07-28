import { useState, useEffect, useRef,  useCallback } from "react";
import NewsCard from "./NewsCard";
import Navbar from "./Navbar";

const SidebarSuscripciones = ({
  topicos,
  seleccionado,
  setSeleccionado,
  terminoBusqueda,
  setTerminoBusqueda,
  onDesuscribirse,
}) => {
  const [tooltip, setTooltip] = useState(null);

  const topicosFiltrados = topicos.filter(
    (topico) =>
      topico.nombre &&
      topico.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase())
  );

  return (
    <div className="w-full md:w-64 border-r p-4">
      <h3 className="text-xl font-bold mb-4">Tus suscripciones</h3>
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
          topicosFiltrados.map((topico) => (
            <li
              key={topico.id}
              className={`cursor-pointer p-2 rounded mb-2 flex justify-between items-center group ${seleccionado === topico.id
                ? "bg-blue-100 font-semibold"
                : "hover:bg-gray-100"
                }`}
              onClick={() => setSeleccionado(topico.id)}
            >
              <span>{topico.nombre}</span>
              {seleccionado === topico.id && (
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const confirmar = window.confirm(
                        `¿Desuscribirse de ${topico.nombre}?`
                      );
                      if (confirmar) onDesuscribirse(topico.id);
                    }}
                    onMouseEnter={() => setTooltip(topico.id)}
                    onMouseLeave={() => setTooltip(null)}
                    className="w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex justify-center text-sm font-bold"
                  >
                    -
                  </button>
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
  const nombreTopico =
    topicos.find((t) => t.id === topicoSeleccionado)?.nombre || "";

  return (
    <div className="flex-1 p-4">
      <h2 className="text-2xl font-bold mb-4">
        {nombreTopico ? `Noticias de ${nombreTopico}` : "Selecciona un tópico"}
      </h2>
      {noticias.length === 0 ? (
        <div>No hay noticias para este tópico.</div>
      ) : (
        noticias.map((noticia) => (
          <NewsCard key={noticia.id} noticia={noticia} />
        ))
      )}
    </div>
  );
};

const Suscripciones = () => {
  const [topicosSuscritos, setTopicosSuscritos] = useState([]);
  const [topicoSeleccionado, setTopicoSeleccionado] = useState(null);
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const [noticiasPorTopico, setNoticiasPorTopico] = useState({});

  const token = localStorage.getItem("authToken");
  const username = localStorage.getItem("username");

  // Obtener tópicos suscritos al cargar
  useEffect(() => {
    const fetchSubs = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/username/${username}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        const subs = (data.subs || []).map((s) => ({
          id: s.id,
          nombre: s.topicName,
        }));

        setTopicosSuscritos(subs);
        setTopicoSeleccionado(subs[0]?.id || null);
      } catch (error) {
        console.error("Error al cargar suscripciones", error);
      }
    };

    fetchSubs();
  }, []);

  // Función de escucha: solo se activa si hay suscripciones cargadas
  const handleNuevaNoticia = useCallback((nuevaNoticia) => {
    console.log("✅ SSE llegó:", nuevaNoticia);

    if (!nuevaNoticia || topicosSuscritos.length === 0) return;

    console.log("paso return")

    // Ignorar si no está suscrito
    const topico = topicosSuscritos.find((t) => t.nombre.toLowerCase() === nuevaNoticia.topic.toLowerCase());
    if (!topico) return;

    console.log("return 2 ")

    const topicoId = topico.id;

    setNoticiasPorTopico((prev) => {
      const noticiasActuales = prev[topicoId] || [];
      const yaExiste = noticiasActuales.some((n) => n.title === nuevaNoticia.title);
      if (yaExiste) return prev;

      return {
        ...prev,
        [topicoId]: [nuevaNoticia, ...noticiasActuales],
      };
    });
  }, [topicosSuscritos]);

   // Montar SSE solo cuando haya suscripciones cargadas
  useEffect(() => {
    if (topicosSuscritos.length === 0) return;

    const eventSource = new EventSource(`${import.meta.env.VITE_API_URL}/news-stream`);
    eventSource.onmessage = (event) => {
      try {
        const noticia = JSON.parse(event.data);
        handleNuevaNoticia(noticia);
      } catch (e) {
        console.error("[SSE] Error al parsear:", event.data);
      }
    };

    eventSource.onerror = (err) => {
      console.error("[SSE] Error de conexión:", err);
    };

    return () => {
      eventSource.close();
    };
  }, [topicosSuscritos, handleNuevaNoticia]);

  const handleDesuscribirse = async (topicoId) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/topic/${topicoId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const nuevas = topicosSuscritos.filter((t) => t.id !== topicoId);
        setTopicosSuscritos(nuevas);

        if (topicoSeleccionado === topicoId) {
          setTopicoSeleccionado(nuevas[0]?.id || null);
        }
      } else {
        console.error("No se pudo desuscribir");
      }
    } catch (error) {
      console.error("Error al desuscribirse:", error);
    }
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
