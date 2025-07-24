import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Registrarse = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // Paso del registro
    const [formData, setFormData] = useState({
        nombre: '',
        usuario: '',
        email: '',
        fechaNacimiento: '',
        contraseña: '',
        confirmarContraseña: ''
    });

    const [selectedTopics, setSelectedTopics] = useState([]);

    // Lista predeterminada de tópicos
    const topicosDisponibles = [
        { id: 1, nombre: "Tecnología", descripcion: "Innovación y avances tecnológicos" },
        { id: 2, nombre: "Deportes", descripcion: "Resultados y noticias deportivas" },
        { id: 3, nombre: "Ciencia", descripcion: "Descubrimientos científicos" },
        { id: 4, nombre: "Economía", descripcion: "Tendencias económicas y financieras" },
        { id: 5, nombre: "Salud", descripcion: "Medicina y bienestar" },
        { id: 6, nombre: "Entretenimiento", descripcion: "Cine, música y cultura" },
    ];

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

    const handleSubmitStep1 = (e) => {
        e.preventDefault();
        // Validaciones básicas aquí
        if (formData.contraseña !== formData.confirmarContraseña) {
            alert("Las contraseñas no coinciden");
            return;
        }
        setStep(2); // Pasar al paso de selección de tópicos
    };

    const handleSubmitStep2 = () => {
        // Aquí guardarías los datos en el backend o localStorage
        console.log("Datos del usuario:", formData);
        console.log("Tópicos seleccionados:", selectedTopics);
        
        // Guardar en localStorage temporalmente
        localStorage.setItem('userPreferences', JSON.stringify({
            ...formData,
            selectedTopics
        }));
        
        alert("¡Registro completado exitosamente!");
        navigate('/login');
    };

    if (step === 1) {
        return (
            <div className="flex flex-col min-h-dvh justify-center items-center bg-gray-50">
                <div className="w-full max-w-md">
                    <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Crear cuenta en NewsFeed</h2>
                    
                    <form onSubmit={handleSubmitStep1} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo:</label>
                            <input 
                                type="text" 
                                name="nombre" 
                                value={formData.nombre}
                                onChange={handleInputChange}
                                required 
                                placeholder="Ingrese su nombre completo" 
                                className="w-full outline-0 bg-white border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Usuario:</label>
                            <input 
                                type="text" 
                                name="usuario" 
                                value={formData.usuario}
                                onChange={handleInputChange}
                                required 
                                placeholder="Elija un nombre de usuario" 
                                className="w-full outline-0 bg-white border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico:</label>
                            <input 
                                type="email" 
                                name="email" 
                                value={formData.email}
                                onChange={handleInputChange}
                                required 
                                placeholder="correo@ejemplo.com" 
                                className="w-full outline-0 bg-white border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de nacimiento:</label>
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
                            <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña:</label>
                            <input 
                                type="password" 
                                name="contraseña" 
                                value={formData.contraseña}
                                onChange={handleInputChange}
                                required 
                                placeholder="Ingrese su contraseña" 
                                className="w-full outline-0 bg-white border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar contraseña:</label>
                            <input 
                                type="password" 
                                name="confirmarContraseña" 
                                value={formData.confirmarContraseña}
                                onChange={handleInputChange}
                                required 
                                placeholder="Confirme su contraseña" 
                                className="w-full outline-0 bg-white border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        
                        <button 
                            type="submit"
                            className="w-full p-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors mt-6"
                        >
                            Continuar
                        </button>
                    </form>

                    <div className="text-center mt-6">
                        <div className="text-sm text-gray-600">
                            ¿Ya tienes cuenta? <Link to="/login" className="text-blue-600 hover:underline">Inicia sesión</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (step === 2) {
        return (
            <div className="flex flex-col min-h-dvh justify-center items-center bg-gray-50">
                <div className="w-full max-w-2xl">
                    <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">¿Qué te interesa?</h2>
                    <p className="text-center text-gray-600 mb-8">Selecciona los tópicos que más te interesan para personalizar tu experiencia</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        {topicosDisponibles.map(topico => (
                            <div 
                                key={topico.id}
                                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                                    selectedTopics.includes(topico.id) 
                                        ? 'bg-blue-100 border-blue-500' 
                                        : 'bg-white border-gray-300 hover:border-blue-300'
                                }`}
                                onClick={() => handleTopicToggle(topico.id)}
                            >
                                <h3 className="font-semibold text-lg">{topico.nombre}</h3>
                                <p className="text-gray-600 text-sm">{topico.descripcion}</p>
                                <div className="mt-2">
                                    {selectedTopics.includes(topico.id) && (
                                        <span className="text-blue-600 text-sm">✓ Seleccionado</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-4">
                        <button 
                            onClick={() => setStep(1)}
                            className="flex-1 p-3 rounded-lg bg-gray-300 text-gray-700 font-medium hover:bg-gray-400 transition-colors"
                        >
                            Volver
                        </button>
                        <button 
                            onClick={handleSubmitStep2}
                            disabled={selectedTopics.length === 0}
                            className="flex-1 p-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                        >
                            Finalizar registro
                        </button>
                    </div>
                </div>
            </div>
        );
    }
};

export default Registrarse;