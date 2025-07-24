import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    // Verificar que la variable de entorno existe
    const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    
    if (!googleClientId) {
        console.error("VITE_GOOGLE_CLIENT_ID no está configurado en .env");
    }

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // Conectar con backend real
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password
                })
            });

            if (response.ok) {
                const userData = await response.json();
                
                // Guardar datos de sesión del backend
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userId', userData.data.id);
                localStorage.setItem('username', userData.data.username);
                localStorage.setItem('fullName', userData.data.fullName);
                localStorage.setItem('userEmail', userData.data.email);
                localStorage.setItem('authToken', userData.data.token);
                
                console.log("Login exitoso:", userData);
                
                // Disparar evento para actualizar App
                window.dispatchEvent(new Event('localStorageChange'));

                navigate('/');
                
            } else {
                // Manejar diferentes códigos de error
                const errorData = await response.json();
                
                if (response.status === 401) {
                    alert("Credenciales incorrectas");
                } else if (response.status === 404) {
                    alert("Usuario no encontrado");
                } else {
                    alert(errorData.message || "Error al iniciar sesión");
                }
            }
            
        } catch (error) {
            console.error("Error de conexión:", error);
            
            // Mostrar mensaje de error de conexión
            alert("Error de conexión. Verifique que el servidor esté funcionando.");
            
            // SIMULACIÓN TEMPORAL (solo para desarrollo sin backend)
            // TODO: Comentar/eliminar esta sección cuando el backend esté listo
            console.log("Modo simulación activado...");
            const userData = {
                id: 1,
                username: formData.username,
                fullName: "Usuario Test",
                email: "test@email.com",
                token: "fake-jwt-token"
            };
            
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userId', userData.id);
            localStorage.setItem('username', userData.username);
            localStorage.setItem('fullName', userData.fullName);
            localStorage.setItem('userEmail', userData.email);
            localStorage.setItem('authToken', userData.token);
            
            window.dispatchEvent(new Event('localStorageChange'));
            navigate('/');
        }
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            console.log("Google credential:", credentialResponse.credential);
            
            // TODO: Enviar al backend
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/google`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    token: credentialResponse.credential
                })
            });

            if (response.ok) {
                const userData = await response.json();
                // Guardar sesión...
                
                // Disparar evento para actualizar App
                window.dispatchEvent(new Event('localStorageChange'));

                navigate('/');
            }
            
        } catch (error) {
            console.error("Error en Google login:", error);
            
            // SIMULACIÓN: Decodificar token de Google
            const decoded = JSON.parse(atob(credentialResponse.credential.split('.')[1]));
            
            const googleUserData = {
                id: Date.now(),
                username: decoded.email.split('@')[0],
                fullName: decoded.name,
                email: decoded.email,
                token: "fake-google-token"
            };
            
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userId', googleUserData.id);
            localStorage.setItem('username', googleUserData.username);
            localStorage.setItem('fullName', googleUserData.fullName);
            localStorage.setItem('userEmail', googleUserData.email);
            localStorage.setItem('authToken', googleUserData.token);
            localStorage.setItem('isGoogleUser', 'true');
            
            // Disparar evento para actualizar App
            window.dispatchEvent(new Event('localStorageChange'));

            navigate('/');
        }
    };

    const handleGoogleError = () => {
        console.error("Error en Google Login");
        alert("Error al iniciar sesión con Google");
    };

    return (
        <div className="flex flex-col min-h-dvh justify-center items-center bg-gray-50">
            <div className="w-full max-w-md">
                <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Iniciar Sesión en NewsFeed</h2>
                
                {/* Google Login - Solo mostrar si hay Client ID */}
                {googleClientId ? (
                    <div className="mb-6">
                        <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={handleGoogleError}
                            useOneTap={false}
                            theme="outline"
                            size="large"
                            width="100%"
                            text="continue_with"
                            shape="rectangular"
                            logo_alignment="left"
                            render={({ onClick, disabled }) => (
                                <button
                                    onClick={onClick}
                                    disabled={disabled}
                                    className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-lg p-3 hover:bg-gray-50 transition-colors shadow-sm disabled:opacity-50"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                    </svg>
                                    <span className="text-gray-700 font-medium">Continuar con Google</span>
                                </button>
                            )}
                        />
                    </div>
                ) : (
                    <div className="mb-6 p-3 bg-yellow-100 border border-yellow-400 rounded-lg">
                        <p className="text-sm text-yellow-800">
                            Google Login no disponible. Configura VITE_GOOGLE_CLIENT_ID en .env
                        </p>
                    </div>
                )}

                {/* Separador */}
                <div className="flex items-center mb-6">
                    <div className="flex-1 border-t border-gray-300"></div>
                    <span className="px-4 text-sm text-gray-500 bg-gray-50">o</span>
                    <div className="flex-1 border-t border-gray-300"></div>
                </div>

                {/* Resto del formulario... */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                            Usuario:
                        </label>
                        <input 
                            type="text" 
                            name="username" 
                            value={formData.username}
                            onChange={handleInputChange}
                            required 
                            placeholder="Ingrese su nombre de usuario" 
                            className="w-full outline-0 bg-white border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Contraseña:
                        </label>
                        <input 
                            type="password" 
                            name="password" 
                            value={formData.password}
                            onChange={handleInputChange}
                            required 
                            placeholder="Ingrese su contraseña" 
                            className="w-full outline-0 bg-white border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    
                    <button 
                        type="submit"
                        className="w-full p-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors mt-6"
                    >
                        Iniciar Sesión
                    </button>
                </form>

                {/* Enlaces adicionales */}
                <div className="text-center mt-6 space-y-2">
                    <a href="#" className="text-sm text-blue-600 hover:underline">¿Olvidaste tu contraseña?</a>
                    <div className="text-sm text-gray-600">
                        ¿No tienes cuenta? <Link to={"/registrarse"} className="text-blue-600 hover:underline">Regístrate</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;