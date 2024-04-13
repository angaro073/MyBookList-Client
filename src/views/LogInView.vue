<script setup>
import { ref } from "vue";
import { RouterLink } from 'vue-router';
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

const data = ref({
  email: '',
  password: '',
  remember: false
});

function checkForm() {
//
console.log('Checking the form to login...')

//
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
          'alert-danger': authStore.status >= 400,
        }"
      >
        {{ authStore.alerts }}
      </div>
      <div class="form-outline mb-4">
        <label class="form-label" for="emailInput">Email address</label>
        <input
          type="email"
          id="emailInput"
          v-model="data.email"
          class="form-control"
          :class="{
            'is-invalid': authStore.errors && authStore.errors.email,
          }"
          required
        />
        <div v-if="authStore.errors && authStore.errors.email" class="invalid-feedback">
          <ul>
            <li v-for="(error, index) in authStore.errors.email" :key="index">{{ error }}</li>
          </ul>
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
            'is-invalid': authStore.errors && authStore.errors.password,
          }"
          required
        />
        <div v-if="authStore.errors && authStore.errors.password" class="invalid-feedback">
          <ul>
            <li v-for="(error, index) in authStore.errors.password" :key="index">{{ error }}</li>
          </ul>
        </div>
      </div>

      <div class="row mb-4">
        <div class="col d-flex justify-content-center">
          <div class="form-check">
            <input
              type="checkbox"
              id="rememberInput"
              v-model="data.remember"
              class="form-check-input"
              checked="true"
            />
            <label class="form-check-label" for="rememberInput">Remember me</label>
          </div>
        </div>
        <div class="col">
          <router-link :to="{name: 'forgot-password'}">Forgot password?</router-link>
        </div>
      </div>

      <div class="row">
        <button type="submit" class="btn btn-primary">Sign in</button>
      </div>

      <div class="row text-center text-muted mt-5 mb-0">
        <p>
          Not a member?
          <router-link :to="{name: 'register'}">Sign Up</router-link>
        </p>
      </div>
    </form>
  </main>
</template>