<script setup>
import { RouterLink } from 'vue-router';

const props = defineProps([
  'data'
]);
</script>

<template>
  <div class="table-responsive">
    <table class="table table-bordered">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Authors</th>
          <th scope="col">Publisher</th>
          <th scope="col">Categories</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(result, index) in props.data" :key="index">
          <!-- title with selfLink -->
          <td scope="row">
            <router-link
              :to="{name: 'book', params: {bookId: result.id}}"
              class="text-decoration-none text-reset"
            >
              {{ result.volumeInfo.title }}
            </router-link>
          </td>
          <!-- authors -->
          <td v-if="result.volumeInfo.authors">
            <a v-for="(author,index) in result.volumeInfo.authors" :key="index">{{ author }}</a>
          </td>
          <td v-else class="text-muted">unknown</td>
          <!-- publisher -->
          <td v-if="result.volumeInfo.publisher">
            <a>{{ result.volumeInfo.publisher }}</a>
          </td>
          <td v-else class="text-muted">unknown</td>
          <!-- categories -->
          <td v-if="result.volumeInfo.categories">
            <a v-for="(category,index) in result.volumeInfo.categories" :key="index">{{ category }}</a>
          </td>
          <td v-else class="text-muted">unknown</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>