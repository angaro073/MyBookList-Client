<script setup>
import { useAuthStore } from "@/stores/auth.js";
import { ref } from "vue";
import { RouterLink } from 'vue-router';

const authStore = useAuthStore();

authStore.clear();

const data = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
});

function checkForm() {
  authStore.handleRegister(data.value);
}
</script>

<template>
<main class="w-100 p-4 d-flex justify-content-center">
  <form @submit.prevent="checkForm">
    <div class="form-outline mb-4">
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
        <label class="form-label" for="nameInput">Name</label>
        <input
          type="text"
          id="nameInput"
          v-model="data.name"
          class="form-control"
          :class="{
            'is-invalid': authStore.errors && authStore.errors.name,
          }"
          :disabled="authStore.inProcess"
          required
        />
        <div v-if="authStore.errors && authStore.errors.name" class="invalid-feedback">
          {{ authStore.errors.name }}
        </div>
      </div>

      <div class="form-outline mb-4">
        <label class="form-label" for="emailInput">Email</label>
        <input
          type="email"
          id="emailInput"
          v-model="data.email"
          class="form-control"
          :class="{
            'is-invalid': authStore.errors && authStore.errors.email,
          }"
          :disabled="authStore.inProcess"
          required
        />
        <div v-if="authStore.errors && authStore.errors.email" class="invalid-feedback">
          {{ authStore.errors.email }}
        </div>
      </div>


      <div class="form-outline mb-4">
        <label class="form-label" for="passwordInput1">Password</label>
        <input
          type="password"
          id="passwordInput1"
          v-model="data.password"
          class="form-control"
          :class="{
            'is-invalid': authStore.errors && authStore.errors.password,
          }"
          :disabled="authStore.inProcess"
          required
        />
        <div v-if="authStore.errors && authStore.errors.password" class="invalid-feedback">
          {{ authStore.errors.password }}
        </div>
      </div>

      <div class="form-outline mb-4">
        <label class="form-label" for="password2Input">Confirm Password</label>
        <input
          type="password"
          id="password2Input"
          v-model="data.password_confirmation"
          class="form-control"
          :class="{
            'is-invalid': authStore.errors && authStore.errors.password,
          }"
          :disabled="authStore.inProcess"
          required
        />
      </div>

      <!-- <div class="form-check d-flex justify-content-center mb-5">
        <input
          id="terms"
          type="checkbox"
          v-model="termsServices"
          class="form-check-input me-2"
          :class="{
            'is-invalid': errors.termsServices,
            'is-valid': termsServices,
          }"
        />
        <label class="form-check-label" for="terms">
          I agree all statements in
          <router-link :to="{name: 'legal-conditions'}" class="text-body">
            <u>Terms of service</u>
          </router-link>
        </label>
      </div> -->

      <div class="row">
        <button v-if="authStore.inProcess" class="btn btn-primary" type="button" disabled>
          <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          Loading...
        </button>
        <button v-else type="submit" class="btn btn-primary">Sign Up</button>
      </div>

      <p class="text-center text-muted mt-5 mb-0">
        Have already an account?
        <router-link :to="{name: 'login'}" class="fw-bold text-body">
          <u>Log In here</u>
        </router-link>
      </p>
    </form>
  </main>
</template>