<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

authStore.clear();

const data = ref({
  email: '',
  password: '',
  remember: false
});

function checkForm() {
  //
  console.log('Checking the form to login...');
  console.log(authStore.errors);
  //

  authStore.handleLogin(data.value);
}
</script>

<template>
  <main class="w-100 p-4 d-flex justify-content-center">
    <form @submit.prevent="checkForm">
      <div
        v-if="authStore.alerts"
        class="alert"
        :class="{
          'alert-success': authStore.status >= 200 && authStore.status < 299,
          'alert-danger': authStore.status >= 400
        }"
      >
        {{ authStore.alerts }}
      </div>
      <div class="form-outline mb-4">
        <label class="form-label" for="emailInput">Email</label>
        <input
          type="email"
          id="emailInput"
          v-model="data.email"
          class="form-control"
          :class="{
            'is-invalid': (authStore.errors && authStore.errors.email) || authStore.status >= 400
          }"
          :disabled="authStore.inProcess"
          required
        />
        <div v-if="authStore.errors && authStore.errors.email" class="invalid-feedback">
          {{ authStore.errors.email }}
        </div>
      </div>

      <div class="form-outline mb-4">
        <label class="form-label" for="passwordInput">Password</label>
        <input
          type="password"
          id="passwordInput"
          v-model="data.password"
          class="form-control"
          :class="{
            'is-invalid': (authStore.errors && authStore.errors.password) || authStore.status >= 400
          }"
          :disabled="authStore.inProcess"
          required
        />
        <div v-if="authStore.errors && authStore.errors.password" class="invalid-feedback">
          {{ authStore.errors.password }}
        </div>
      </div>

      <div class="d-flex justify-content-start mb-4">
        <div class="d-flex justify-content-center">
          <div class="form-check">
            <input
              type="checkbox"
              id="rememberInput"
              v-model="data.remember"
              class="form-check-input"
              :disabled="authStore.inProcess"
              checked="true"
            />
            <label class="form-check-label" for="rememberInput">Remember me</label>
          </div>
        </div>
      </div>

      <div class="row">
        <button v-if="authStore.inProcess" class="btn btn-primary" type="button" disabled>
          <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          Loading...
        </button>
        <button v-else type="submit" class="btn btn-primary">Log In</button>
      </div>

      <div class="row text-center text-muted mt-5 mb-0">
        <p>
          Not a member?
          <router-link :to="{ name: 'register' }">Sign Up</router-link>
        </p>
      </div>
    </form>
  </main>
</template>
