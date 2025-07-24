import { Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useState, useEffect } from 'react';
import Home from './components/Home';
import Login from './components/Login';
import Registrarse from './components/Registrarse';
import Explorar from './components/Explorar';
import Suscripciones from './components/Suscripciones';

function App() {
  // Estado reactivo para el login
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );
  
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  // Escuchar cambios en localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    };

    // Escuchar eventos de localStorage desde otras ventanas/tabs
    window.addEventListener('storage', handleStorageChange);

    // Escuchar cambios manuales (nuestro caso)
    window.addEventListener('localStorageChange', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('localStorageChange', handleStorageChange);
    };
  }, []);

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <Routes>
        <Route 
          path="/login" 
          element={isLoggedIn ? <Navigate to="/" /> : <Login />} 
        />
        <Route 
          path="/registrarse" 
          element={isLoggedIn ? <Navigate to="/" /> : <Registrarse />} 
        />
        <Route 
          path="/" 
          element={isLoggedIn ? <Home /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/explorar" 
          element={isLoggedIn ? <Explorar /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/suscripciones" 
          element={isLoggedIn ? <Suscripciones /> : <Navigate to="/login" />} 
        />
      </Routes>
    </GoogleOAuthProvider>
  );
}

export default App;