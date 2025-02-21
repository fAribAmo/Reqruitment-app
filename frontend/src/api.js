import axios from 'axios';

/**
 * Axios instance configured to communicate with the backend API.
 * 
 * @constant {AxiosInstance} api
 */
const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Connect to backend
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true // Ensure cookies/JWTs work properly
});

/**
 * Logs in a user by sending credentials to the backend.
 * 
 * @async
 * @function loginUser
 * @param {string} username - The user's username.
 * @param {string} password - The user's password.
 * @returns {Promise<Object>} The API response containing a JWT token and role.
 * @throws {Error} If the login request fails.
 */
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
