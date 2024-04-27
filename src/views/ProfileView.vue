<script setup>
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
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
      <div class="card">
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
    </div>
  </div>
</template>
