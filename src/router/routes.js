import { createRouter, createWebHistory } from 'vue-router';

import LoginPage from '@/views/LoginPage/LoginPage.vue';
import HomePage from '@/views/HomePage/HomePage.vue'
import routes from '@/configs/routes.js';
import Cookies from 'js-cookie';

const arrRoutes = [
  {
    path: routes.login,
    name: 'login',
    component: LoginPage
  },
  {
    path:routes.home,
    name:'home',
    component:HomePage,
    meta:{
      requiresAuth:true
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes: arrRoutes
});

router.beforeEach((to, from, next) => {
  const token = Cookies.get('accessToken')
  console.log(Boolean(to.meta.requiresAuth && !token))
  if (to.meta.requiresAuth && !token) {
    next({ name: 'login' });
  } else if (to.name === 'login' && token) {
    next({ name: 'home' });
  } else {
    next();
  }
});

export default router;
