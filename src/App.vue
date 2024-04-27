<script setup>
import HeaderLayout from '@/components/HeaderLayout.vue';
import FooterLayout from '@/components/FooterLayout.vue';

import AdBanner from './components/AdBanner.vue';

import { RouterView } from 'vue-router';
</script>

<template>
  <HeaderLayout />

  <aside>
    <AdBanner />
  </aside>

  <main class="container-fluid p-5">
    <router-view />
  </main>

  <FooterLayout />
</template>
