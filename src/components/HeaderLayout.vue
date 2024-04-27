<script setup>
import { useAuthStore } from '@/stores/auth';
import { RouterLink } from 'vue-router';

const authStore = useAuthStore();

authStore.getUser();
</script>

<template>
  <header class="sticky-top mb-4">
    <nav class="navbar navbar-expand-lg p-0">
      <div class="container-fluid">
        <router-link :to="{ name: 'home' }" class="navbar-brand">
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
          class="offcanvas offcanvas-end w-auto"
          data-bs-scroll="true"
          data-bs-backdrop="true"
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
            <hr class="d-lg-none" />

            <ul class="navbar-nav nav-underline flex-row flex-wrap bd-navbar-nav">
              <li class="nav-item col-6 col-lg-auto">
                <router-link
                  :to="{ name: 'library', query: { mode: 'list' } }"
                  class="nav-link text-black py-2 px-0 px-lg-2"
                  >Library</router-link
                >
              </li>
            </ul>

            <hr class="py-2 my-2" />

            <!-- avatar -->
            <ul class="navbar-nav flex-row flex-wrap ms-md-auto">
              <li v-if="!authStore.user" class="nav-item mx-auto">
                <div class="d-flex">
                  <div class="me-2">
                    <router-link :to="{ name: 'login' }" class="btn bg-gradient">
                      Log In
                    </router-link>
                  </div>
                  <div class="ms-2">
                    <router-link :to="{ name: 'register' }" class="btn bg-gradient">
                      Sign Up
                    </router-link>
                  </div>
                </div>
              </li>
              <li v-else class="nav-item my-auto">
                <div class="dropdown dropstart">
                  <button
                    class="btn dropdown-toggle"
                    id="dropdownUser"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    data-bs-reference="parent"
                  >
                    <img
                      src="@/assets/icons/user-icon.svg"
                      width="32"
                      height="32"
                      class="rounded-circle me-2"
                    />
                    <strong>{{ authStore.user.name }}</strong>
                  </button>
                  <ul
                    class="dropdown-menu text-small shadow w-auto text-center"
                    aria-labelledby="dropdownUser"
                  >
                    <li>
                      <router-link
                        :to="{ name: 'collection' }"
                        class="dropdown-item"
                        activeClass="active"
                        >Collections</router-link
                      >
                    </li>
                    <li>
                      <router-link
                        :to="{ name: 'profile' }"
                        class="dropdown-item"
                        activeClass="active"
                        >Profile</router-link
                      >
                    </li>
                    <li><hr class="dropdown-divider" /></li>
                    <li>
                      <router-link
                        :to="{ name: 'logout' }"
                        class="dropdown-item"
                        activeClass="active"
                        >Log out</router-link
                      >
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
