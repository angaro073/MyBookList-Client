<script setup>
import { RouterLink } from 'vue-router';

const props = defineProps([
  'data'
]);
</script>

<template>
  <div class="container">
    <div class="list-group">
      <router-link
        v-for="(result, index) in props.data.items" :key="index"
        :to="{name: 'book', params: {bookId: result.book_id}}"
        class="list-group-item list-group-item-action d-flex justify-content-between"
      >
        <h5 class="mb-1">{{ result.title }}</h5>
        <small>{{ result.publishedDate ? $filters.dateShort(result.publishedDate):'unknown' }}</small>
      </router-link>
    </div>
  </div>
</template>