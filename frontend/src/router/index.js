import { createRouter, createWebHistory } from 'vue-router';

import Apply from '../pages/Apply.vue';
import Dashboard from '../pages/Dashboard.vue';
import Login from '../pages/LoginPage.vue';
import Recruiter from '../pages/Recruiter.vue';
import Register from '../pages/RegisterPage.vue';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/apply', component: Apply },
  { path: '/dashboard', component: Dashboard },
  { path: '/login', component: Login },
  { path: '/recruiter', component: Recruiter },
  { path: '/register', component: Register },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
