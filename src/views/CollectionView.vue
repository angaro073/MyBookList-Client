<script setup>
import { ref } from 'vue';
import { RouterLink, onBeforeRouteUpdate } from 'vue-router';

import SpinnerBorder from '@/components/SpinnerBorder.vue';

import ListView from '@/components/ListView.vue';

import { useAuthStore } from '@/stores/auth';
const authStore = useAuthStore();

import { useCollectionStore } from '@/stores/collection';
const collectionStore = useCollectionStore();

let state = ref(null);

onBeforeRouteUpdate((to) => {
  if (to.query.state && authStore.user) {
    console.log('State: ' + to.query.state);
    state.value = to.query.state;
    collectionStore.getByState(authStore.user.id, to.query.state);
  }
});
</script>

<template>
  <div class="container">
    <ul class="nav nav-tabs justify-content-center flex-column flex-sm-row">
      <li class="nav-item text-center">
        <router-link
          :to="{ name: 'collection', query: { state: 'pending' } }"
          class="nav-link text-reset"
          :class="[
            { active: state && state == 'pending' },
            { disabled: collectionStore.inProcess }
          ]"
          >pending</router-link
        >
      </li>
      <li class="nav-item text-center">
        <router-link
          :to="{ name: 'collection', query: { state: 'reading' } }"
          class="nav-link text-reset"
          :class="[
            { active: state && state == 'reading' },
            { disabled: collectionStore.inProcess }
          ]"
          >reading</router-link
        >
      </li>
      <li class="nav-item text-center">
        <router-link
          :to="{ name: 'collection', query: { state: 'completed' } }"
          class="nav-link text-reset"
          :class="[
            { active: state && state == 'completed' },
            { disabled: collectionStore.inProcess }
          ]"
          >completed</router-link
        >
      </li>
      <li class="nav-item text-center">
        <router-link
          :to="{ name: 'collection', query: { state: 'paused' } }"
          class="nav-link text-reset"
          :class="[{ active: state && state == 'paused' }, { disabled: collectionStore.inProcess }]"
          >paused</router-link
        >
      </li>
      <li class="nav-item text-center">
        <router-link
          :to="{ name: 'collection', query: { state: 'dropped' } }"
          class="nav-link text-reset"
          :class="[
            { active: state && state == 'dropped' },
            { disabled: collectionStore.inProcess }
          ]"
          >dropped</router-link
        >
      </li>
    </ul>

    <SpinnerBorder v-if="collectionStore.inProcess" />
    <div v-else>
      <div v-if="collectionStore.results">
        <div class="row my-3 align-items-center">
          <div class="col-auto d-inline">{{ collectionStore.results.totalItems }} results</div>
        </div>
        <div class="row">
          <ListView :data="collectionStore.results" />
        </div>
      </div>
      <div v-else class="container-fluid p-4">
        <span>Results Not Found...</span>
      </div>
    </div>
  </div>
</template>
