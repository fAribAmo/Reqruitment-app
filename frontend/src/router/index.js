import { createRouter, createWebHistory } from 'vue-router';

import Apply from '../pages/Apply.vue';
import Dashboard from '../pages/Dashboard.vue';
import LoginPage from '../pages/LoginPage.vue';  
import Recruiter from '../pages/Recruiter.vue';
import RegisterPage from '../pages/RegisterPage.vue';  

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/apply', component: Apply },
  { path: '/dashboard', component: Dashboard },
  { path: '/login', component: LoginPage },  
  { path: '/recruiter', component: Recruiter },
  { path: '/register', component: RegisterPage },  
];


const router = createRouter({
  history: createWebHistory(), 
  routes,
});

export default router;