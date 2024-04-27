<script setup>
import { RouterLink } from 'vue-router';

const props = defineProps(['data']);
</script>

<template>
  <div
    v-for="(result, index) in props.data"
    :key="index"
    class="d-flex mb-4 col-12 col-sm-6 col-md-4 col-lg-3"
  >
    <router-link
      :to="{ name: 'book', params: { bookId: result.id } }"
      class="card text-center w-100 galleryBox stretched-link"
    >
      <div
        v-if="result.volumeInfo.imageLinks && result.volumeInfo.imageLinks.smallThumbnail"
        class="order-0 order-md-1 p-2"
      >
        <img
          :src="result.volumeInfo.imageLinks.smallThumbnail"
          class="lazy card-img-top img-fluid"
        />
      </div>
      <div v-else class="order-0 order-md-1 p-2">
        <img src="@/assets/icons/book-icon.svg" :alt="index" class="lazy card-img-top img-fluid" />
      </div>
      <div class="card-body d-flex flex-column">
        <h2 class="card-title h3">{{ result.volumeInfo.title }}</h2>
        <p class="card-text">{{ result.volumeInfo.publishedDate }}</p>
      </div>
    </router-link>
  </div>
</template>
