import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Connect to backend
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true // Ensure cookies/JWTs work properly
});

export async function loginUser(username, password) {
    try {
        //the request goes to /api/auth/login
        const response = await api.post('/auth/login', { username, password });
        console.log("API Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("API Login Error:", error.response ? error.response.data : error);
        throw error;
    }
}

export default api;
