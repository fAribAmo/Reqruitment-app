/**
 * Clears stored user data from localStorage when the frontend starts.
 * This ensures users are required to log in again after a restart.
 */
localStorage.removeItem("user"); 
console.log("localStorage cleared on app start");

import { createApp } from 'vue'
//import './style.css'
import App from './App.vue'
import router from './router'; 
import Header from './components/header.vue';

/**
 * Initializes the Vue.js application.
 *
 * @constant {Object} app - The Vue application instance.
 */
const app = createApp(App);

app.component("commonHeader", Header);
/**
 * Attaches Vue Router to the application.
 */
app.use(router); 
/**
 * Mounts the Vue application to the `#app` element in `index.html`.
 */
app.mount('#app');
