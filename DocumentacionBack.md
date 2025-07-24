## Endpoint de login Tradicional
Login tradicional:
POST /api/auth/login
Content-Type: application/json

// Request:
{
    "username": "jonathan_user",
    "password": "mi_password123"
}

// Response exitosa (200):
{
    "success": true,
    "data": {
        "id": 1,
        "username": "jonathan_user",
        "fullName": "Jonathan Ortega",
        "email": "jonathan@email.com",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        "roles": ["USER"]
    }
}

// Response error (401):
{
    "success": false,
    "message": "Credenciales incorrectas"
}

// Response error (404):
{
    "success": false,
    "message": "Usuario no encontrado"
}

Google OAuth:
GET /api/auth/google
// Redirige a Google OAuth

GET /api/auth/google/callback
// Google callback, retorna:
{
    "success": true,
    "data": {
        "id": 2,
        "username": "google_user",
        "fullName": "Juan Pérez",
        "email": "juan@gmail.com",
        "token": "jwt-token-here",
        "isGoogleUser": true
    }
}

## Endpoint de Registro

POST /api/auth/register
Content-Type: application/json

// Request:
{
    "nombre": "Juan Pérez",
    "usuario": "juan_perez",
    "email": "juan@ejemplo.com",
    "fechaNacimiento": "1995-05-15",
    "contraseña": "mi_password123",
    "selectedTopics": [1, 2, 3]  // IDs de tópicos seleccionados
}

// Response exitosa (201):
{
    "success": true,
    "message": "Usuario registrado exitosamente",
    "data": {
        "id": 123,
        "username": "juan_perez",
        "email": "juan@ejemplo.com"
    }
}

// Response error (409 - Conflicto):
{
    "success": false,
    "message": "El usuario o email ya existe"
}

// Response error (400 - Datos inválidos):
{
    "success": false,
    "message": "Email inválido" // o cualquier error de validación
}

2. Campos requeridos en localStorage:
// Después del login exitoso, guardar:
localStorage.setItem('isLoggedIn', 'true');
localStorage.setItem('userId', userData.id);
localStorage.setItem('username', userData.username);
localStorage.setItem('fullName', userData.fullName); // IMPORTANTE para avatar
localStorage.setItem('userEmail', userData.email);
localStorage.setItem('authToken', userData.token);

3. Headers para requests autenticados:
const authToken = localStorage.getItem('authToken');

fetch('/api/protected-endpoint', {
    headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
    }
});

4. Funciones de utilidad para el desarrollador backend:
// utils/auth.js
export const getAuthHeaders = () => ({
    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
    'Content-Type': 'application/json'
});

export const getUserData = () => ({
    userId: localStorage.getItem('userId'),
    username: localStorage.getItem('username'),
    fullName: localStorage.getItem('fullName'),
    email: localStorage.getItem('userEmail')
});

export const isAuthenticated = () => {
    return localStorage.getItem('isLoggedIn') === 'true' && 
           localStorage.getItem('authToken');
};