import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '../views/HomeView.vue';

import LogInView from '@/views/LogInView.vue';
import LogOutView from '@/views/LogOutView.vue';
import RegisterView from '@/views/RegisterView.vue';
import ProfileView from '@/views/ProfileView.vue';

import LibraryView from '@/views/LibraryView.vue';
import BookView from '@/views/BookView.vue';

import AboutView from '@/views/AboutView.vue';
import HelpView from '@/views/HelpView.vue';
import PrivacyPolicyView from '@/views/PrivacyPolicyView.vue';
import LegalConditionsView from '@/views/LegalConditionsView.vue';

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
      component: LogInView
    },
    {
      path: '/logout',
      name: 'logout',
      component: LogOutView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView
    },
    {
      path: '/library',
      name: 'library',
      component: LibraryView
    },
    {
      path: '/library/:bookId',
      name: 'book',
      component: BookView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/help',
      name: 'help',
      component: HelpView
    },
    {
      path: '/privacy-policy',
      name: 'privacy-policy',
      component: PrivacyPolicyView
    },
    {
      path: '/legal-conditions',
      name: 'legal-conditions',
      component: LegalConditionsView
    }
  ], 
  sensitive: true,
  strict: true,
})

export default router;
