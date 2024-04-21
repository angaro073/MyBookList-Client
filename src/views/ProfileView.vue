<script setup>
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
</script>

<template>
  <h1>User Profile</h1>
  {{ authStore.user }}
</template>