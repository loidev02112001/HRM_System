import { createRouter, createWebHistory } from 'vue-router';

import BlogPage from '@/views/BlogPage/BlogPage.vue';
import ContactPage from '@/views/ContactPage/ContactPage.vue';
import HomePage from '@/views/HomePage/HomePage.vue';
import LoginPage from '@/views/LoginPage/LoginPage.vue';
import ProductPage from '@/views/ProductPage/ProductPage.vue';
import RegisterPage from '@/views/RegisterPage/RegisterPage.vue';
import ChangePasswordPage from '@/views/ChangePasswordPage/ChangePasswordPage.vue'
import UserLayout from '@/layout/UserLayout.vue';
import routes from '@/configs/routes';

const arrRoutes = [
  {
    path: routes.login,
    name: 'login',
    component: LoginPage
  },
  {
    path: routes.register,
    name: 'register',
    component: RegisterPage
  },
  {
    path: '/',
    component: UserLayout,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: routes.blog,
        name: 'blog',
        component: BlogPage
      },
      {
        path: routes.contact,
        component: ContactPage,
        name: 'contact'
      },
      {
        path: routes.home,
        component: HomePage,
        name: 'home'
      },
      {
        path: routes.product,
        component: ProductPage,
        name: 'product'
      },
      {
        path:routes.changePassword,
        component:ChangePasswordPage,
        name:'changePassword'
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes: arrRoutes
});

router.beforeEach((to, from, next) => {
  const token = Cookies.get('accessToken');
  if (to.meta.requiresAuth && !token) {
    next({ name: 'login' });
  } else if (to.name === 'login' && token) {
    next({ name: 'home' });
  } else {
    next();
  }
});

export default router
