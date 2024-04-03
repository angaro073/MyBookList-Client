<script setup>
import { useAuthStore } from "@/stores/auth.js";
import { ref } from "vue";
import { RouterLink } from 'vue-router';

const authStore = useAuthStore();

const data = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
});

// const termsServices = ref(false);

// const validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

function checkForm() {

console.log(data.value);

// Validacion pre request

authStore.handleRegister(data.value);

//
}
</script>

<template>
<main class="w-100 p-4 d-flex justify-content-center">
    <form @submit.prevent="checkForm">
      <div class="form-outline mb-4">
        <label class="form-label" for="nameInput">Name</label>
        <input
          type="text"
          id="nameInput"
          v-model="data.name"
          class="form-control"
          :class="{
            'is-invalid': authStore.errors.name,
          }"

        />
        <div v-if="authStore.errors.name" class="invalid-feedback">
          {{ authStore.errors.name }}
        </div>
      </div>

      <div class="form-outline mb-4">
        <label class="form-label" for="emailInput">Email address</label>
        <input
          type="text"
          id="emailInput"
          v-model="data.email"
          class="form-control"
          :class="{
            'is-invalid': authStore.errors.email,
          }"

        />
        <div v-if="authStore.errors.email" class="invalid-feedback">
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
            'is-invalid': authStore.errors.password,
          }"

        />
        <div v-if="authStore.errors.password" class="invalid-feedback">
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
            'is-invalid': authStore.errors.password,
          }"

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
        <button type="submit" class="btn btn-primary">Sign Up</button>
      </div>

      <p class="text-center text-muted mt-5 mb-0">
        Have already an account?
        <router-link :to="{name: 'login'}" class="fw-bold text-body">
          <u>Login here</u>
        </router-link>
      </p>
    </form>
  </main>
</template>