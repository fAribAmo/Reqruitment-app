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

/**
 * Global navigation guard for role-based authentication.
 * 
 * @function beforeEach
 * @param {Object} to - Target route the user is navigating to.
 * @param {Object} from - Previous route the user navigated from.
 * @param {Function} next - Function to control navigation.
 * @returns {void} Redirects users based on authentication and role.
 */
router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user'));

  console.log("Checking Stored User (Before Navigation):", user); //Debug user role

  if (!user) {
    // Redirect unauthenticated users to login
    if (to.path !== '/login' && to.path !== '/register') {
      console.log("Redirecting to Login (Unauthenticated)");
      return next('/login');
    }
  } else {
    if (user.role == 1 && to.path !== '/recruiter') {
      console.log("Redirecting Recruiter to /recruiter");
      return next('/recruiter'); 
    } else if (user.role == 2 && to.path !== '/dashboard') {
      console.log("Redirecting Applicant to /dashboard");
      return next('/dashboard'); 
    }
  }

  next(); //Allow navigation
});



export default router;