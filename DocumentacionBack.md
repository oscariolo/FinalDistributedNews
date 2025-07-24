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

Registro:
POST /api/auth/register
Content-Type: application/json

// Request:
{
    "nombre": "string",
    "usuario": "string", 
    "email": "string",
    "fechaNacimiento": "YYYY-MM-DD",
    "contraseña": "string",
    "selectedTopics": [1, 2, 3] // IDs de tópicos
}

// Response:
{
    "success": true,
    "message": "Usuario registrado exitosamente"
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