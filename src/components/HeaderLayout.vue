<script setup>
import SearchBox from './SearchBox.vue';

import { useAuthStore } from "@/stores/auth";
import { RouterLink } from 'vue-router';

const authStore = useAuthStore();

authStore.getUser();

</script>

<template>
  <header class="sticky-top mb-4">
    <nav class="navbar navbar-expand-lg p-0">
      <div class="container-fluid">
        <router-link :to="{name: 'home'}" class="navbar-brand">
          <img src="/favicon.ico" alt="Logo" />
          <span id="brand-name" class="ps-2">MyBookList</span>
        </router-link>
        
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvas"
          aria-controls="offcanvas"
          aria-label="Navbar"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="offcanvas offcanvas-end"
          data-bs-scroll="true"
          data-bs-backdrop="false"
          tabindex="-1"
          id="offcanvas"
          aria-labelledby="offcanvasLabel"
        >
          <div class="offcanvas-header">
            <button
              type="button"
              class="btn-close btn-close-white"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>

          <div class="offcanvas-body p-3 pt-0 p-lg-0">

            <hr class="d-lg-none">

            <ul class="navbar-nav nav-underline flex-row flex-wrap bd-navbar-nav">
              <li class="nav-item col-6 col-lg-auto">
                <router-link :to="{name: 'library', query: {mode: 'list'}}" class="nav-link text-black py-2 px-0 px-lg-2">Library</router-link>
              </li>
            </ul>

            <hr class="d-lg-none">

            <ul class="navbar-nav flex-row flex-wrap ms-md-auto">
              <li class="nav-item col-6 col-lg-auto">
                <SearchBox></SearchBox>
              </li>
            </ul>

            <hr class="d-lg-none">

            <ul class="navbar-nav flex-row flex-wrap">
              <!-- barra -->
              <li class="nav-item py-2 my-auto py-lg-1 col-12 col-lg-auto">
                <div class="vr d-none d-lg-flex h-100 mx-lg-2 text-white"></div>
                <hr class="d-lg-none my-2">
              </li>

              <!-- avatar -->
              <li
                v-if="!authStore.user"
                class="nav-item mx-auto"
              >
                <div class="d-flex">
                  <div class="me-2">
                    <router-link
                      :to="{name: 'login'}"
                      class="btn bg-gradient">
                      Log In
                    </router-link>
                  </div>
                  <div class="ms-2">
                    <router-link
                      :to="{name: 'register'}"
                      class="btn bg-gradient">
                      Sign Up
                    </router-link>
                  </div>
                </div>
              </li>
              <li
                v-else
                class="nav-item dropdown my-auto"
              >
                <div class="dropdown">
                  <a href="#" class="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" id="dropdownUser" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="@/assets/icons/user-icon.svg" width="32" height="32" class="rounded-circle me-2">
                    <strong>{{ authStore.user.name }}</strong>
                  </a>
                  <ul class="dropdown-menu text-small shadow" aria-labelledby="dropdownUser">
                    <li>
                      <router-link :to="{name: 'profile'}" class="dropdown-item">Profile</router-link>
                    </li>
                    <li><hr class="dropdown-divider"></li>
                    <li>
                      <router-link :to="{name: 'logout'}" class="dropdown-item">Log out</router-link>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </nav>
  </header>
</template>