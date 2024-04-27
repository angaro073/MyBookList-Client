import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '../views/HomeView.vue';
import LibraryView from '@/views/LibraryView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LogInView.vue'),
    },
    {
      path: '/logout',
      name: 'logout',
      component: () => import('@/views/LogOutView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/RegisterView.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/ProfileView.vue'),
    },
    {
      path: '/collection',
      name: 'collection',
      component: () => import('@/views/CollectionView.vue'),
    },
    {
      path: '/library',
      name: 'library',
      component: LibraryView
    },
    {
      path: '/library/:bookId',
      name: 'book',
      component: () => import('@/views/BookView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue'),
    },
    {
      path: '/help',
      name: 'help',
      component: () => import('@/views/HelpView.vue'),
    },
    {
      path: '/privacy-policy',
      name: 'privacy-policy',
      component: () => import('@/views/PrivacyPolicyView.vue'),
    },
    {
      path: '/legal-conditions',
      name: 'legal-conditions',
      component: () => import('@/views/LegalConditionsView.vue'),
    },
    // {
    //   path: '*',
    //   name: 'page-not-found',
    //   component: () => import('@/views/PageNotFoundView.vue'),
    // }
  ], 
  sensitive: true,
  strict: true,
})

router.beforeEach((to, from) => {
  let sessionToken = sessionStorage.getItem('sessionToken');
  if (
    sessionToken
    && (
      to.name == 'login'
      || to.name == 'register'
    )
  ) {
    return { name: from.name };
  } else if (
    !sessionToken
    && (
      to.name == 'profile'
      || to.name == 'logout'
      || to.name == 'collection'
    )
  ) {
    return { name: 'login' };
  }
});

export default router;