import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Registrarse = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    usuario: '',
    email: '',
    fechaNacimiento: '',
    contraseña: '',
    confirmarContraseña: ''
  });
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [topics, setTopics] = useState(null);
  const [isTopicsLoading, setIsTopicsLoading] = useState(true);


  // Tópicos disponibles (esto podría venir del backend)
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/topics`);
        const json = await response.json();
        setTopics(json);
      } catch (error) {
        console.error('Error fetching topics', error);
        alert("Error cargando los tópicos. Intenta nuevamente.");
      } finally {
        setIsTopicsLoading(false);
      }
    };
    fetchTopics();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleTopicToggle = (topicId) => {
    setSelectedTopics(prev =>
      prev.includes(topicId)
        ? prev.filter(id => id !== topicId)
        : [...prev, topicId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(`${import.meta.env.VITE_API_URL}/api/auth/register`);

    // Validaciones frontend
    if (formData.contraseña !== formData.confirmarContraseña) {
      alert("Las contraseñas no coinciden");
      return;
    }

    if (formData.contraseña.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    if (selectedTopics.length === 0) {
      alert("Selecciona al menos un tópico de interés");
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Conectar con backend real
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.nombre,
          username: formData.usuario,
          email: formData.email,
          birthday: formData.fechaNacimiento,
          password: formData.contraseña,
          subs: selectedTopics
        })
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Registro exitoso:", result);

        alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
        navigate('/login');

      } else {
        const errorData = await response.json();

        if (response.status === 409) {
          alert("El usuario o email ya existe");
        } else if (response.status === 400) {
          alert(errorData.message || "Datos inválidos");
        } else {
          alert("Error al registrar usuario");
        }
      }

    } catch (error) {
      console.error("Error de conexión:", error);
      alert("Error de red al registrar");
    } finally {
      setIsLoading(false);
    }
  };

  if (isTopicsLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-gray-600">Cargando tópicos...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-dvh justify-center items-center bg-gray-50 py-8">
      <div className="w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Registrarse en NewsFeed</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Información personal */}
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre completo:
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              required
              placeholder="Ej: Juan Pérez"
              className="w-full outline-0 bg-white border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="usuario" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre de usuario:
            </label>
            <input
              type="text"
              name="usuario"
              value={formData.usuario}
              onChange={handleInputChange}
              required
              placeholder="Ej: juan_perez"
              className="w-full outline-0 bg-white border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email:
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="juan@ejemplo.com"
              className="w-full outline-0 bg-white border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="fechaNacimiento" className="block text-sm font-medium text-gray-700 mb-1">
              Fecha de nacimiento:
            </label>
            <input
              type="date"
              name="fechaNacimiento"
              value={formData.fechaNacimiento}
              onChange={handleInputChange}
              required
              className="w-full outline-0 bg-white border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="contraseña" className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña:
            </label>
            <input
              type="password"
              name="contraseña"
              value={formData.contraseña}
              onChange={handleInputChange}
              required
              placeholder="Mínimo 6 caracteres"
              className="w-full outline-0 bg-white border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="confirmarContraseña" className="block text-sm font-medium text-gray-700 mb-1">
              Confirmar contraseña:
            </label>
            <input
              type="password"
              name="confirmarContraseña"
              value={formData.confirmarContraseña}
              onChange={handleInputChange}
              required
              placeholder="Repetir contraseña"
              className="w-full outline-0 bg-white border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Selección de tópicos */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tópicos de interés (selecciona al menos uno):
            </label>
            <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto border border-gray-300 rounded-lg p-3">
              {topics.map(topic => (
                <label key={topic.id} className="flex items-center space-x-2 text-sm">
                  <input
                    type="checkbox"
                    checked={selectedTopics.includes(topic.id)}
                    onChange={() => handleTopicToggle(topic.id)}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>{topic.topicName}</span>
                </label>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Seleccionados: {selectedTopics.length}
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full p-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Registrando..." : "Registrarse"}
          </button>
        </form>

        {/* Link a login */}
        <div className="text-center mt-6">
          <div className="text-sm text-gray-600">
            ¿Ya tienes cuenta? <Link to={"/login"} className="text-blue-600 hover:underline">Inicia sesión</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Registrarse;