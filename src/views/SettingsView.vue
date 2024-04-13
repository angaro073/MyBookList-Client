<script setup>
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
</script>

<template>
  <h1>Este es SettingsView</h1>
  {{ authStore.user }}
</template>