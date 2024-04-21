<script setup>
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

authStore.handleLogout();
</script>

<template>
  <h1>Logout...</h1>
  <div
        v-if="authStore.alerts"
        class="alert"
        :class="{
          'alert-success': authStore.status >= 200 && authStore.status < 299,
          'alert-danger': authStore.status >= 400,
        }"
      >
        {{ authStore.alerts }}
      </div>
</template>