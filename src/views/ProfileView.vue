<script setup>
import { ref } from 'vue';

import { useAuthStore } from '@/stores/auth';
const authStore = useAuthStore();

const data = ref({
  password: ''
});
</script>

<template>
  <div class="row">
    <div class="col-lg-4 mb-3">
      <div class="card">
        <div class="card-body text-center">
          <img src="@\assets\icons\user-icon.svg" alt="avatar" class="rounded-circle img-fluid" />
        </div>
      </div>
    </div>

    <div class="col-lg-8">
      <div class="card mb-3">
        <div class="card-body">
          <div class="row">
            <div class="col-sm-3">
              <p class="mb-0">Username</p>
            </div>
            <div class="col-sm-9">
              <p class="text-muted mb-0">{{ authStore.user.name }}</p>
            </div>
          </div>
          <hr />
          <div class="row">
            <div class="col-sm-3">
              <p class="mb-0">Email</p>
            </div>
            <div class="col-sm-9">
              <p class="text-muted mb-0">{{ authStore.user.email }}</p>
            </div>
          </div>
        </div>
        <div class="card-footer">
          <div class="row">
            <div class="col-sm-3">
              <p class="mb-0">Member since</p>
            </div>
            <div class="col-sm-9">
              <p class="text-muted mb-0">{{ $filters.dateShort(authStore.user.created_at) }}</p>
            </div>
          </div>
        </div>
      </div>

      <form @submit.prevent="authStore.handleSignOut(data)">
        <div class="form-group">
          <label for="inputPassword">Delete Account</label>
          <div class="input-group">
            <input
              id="inputPassword"
              type="password"
              class="form-control"
              placeholder="Password..."
              v-model="data.password"
              :class="{
                'is-invalid':
                  (authStore.errors && authStore.errors.password) || authStore.status >= 400
              }"
              :disabled="authStore.inProcess"
              required
            />
            <div class="input-group-append">
              <button
                v-if="authStore.inProcess"
                class="btn btn-outline-danger"
                type="button"
                disabled
              >
                <span
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                Loading...
              </button>
              <button v-else type="submit" class="btn btn-outline-danger">Delete</button>
            </div>
          </div>
          <div v-if="authStore.errors && authStore.errors.password" class="invalid-feedback">
            {{ authStore.errors.password }}
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
