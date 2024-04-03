<script setup>
import TableView from '@/components/TableView.vue';
import CardView from '@/components/CardView.vue';

import { watch , computed, ref, onMounted } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

const q = ref({
  key: '',
  author: '',
  publisher: '',
  category: ''
});

onMounted(() => {
  let query = useRoute().query;

  if (query.q) q.value.key = query.q;
  if (query.author) q.value.author = query.author;
  if (query.publisher) q.value.publisher = query.publisher;
  if (query.category) q.value.category = query.category;

  search();
});

const viewMode = computed (() => { return useRoute().query.mode });

const searchResults = ref({});
const maxResults = 12; //Default = 10
const startIndex = ref(0); //Default = 0

watch(startIndex, () => {
  search();
});

watch([q.value.key, q.value.author, q.value.publisher, q.value.category], () => {
  startIndex.value = 0;
});

const searchFilters = computed (() => {
  let filters = `q=${q.value.key}`;
  if (q.value.author) filters += ` inauthor:${q.value.author}`;
  if (q.value.publisher) filters += ` inpublisher:${q.value.publisher}`;
  if (q.value.category) filters += ` subject:${q.value.category}`;
  filters = filters.trim().replace(/ /g, '+');
  filters += `&printType=books&fields=totalItems,items(id,volumeInfo(title,authors,publisher,categories,imageLinks/smallThumbnail))&startIndex=${startIndex.value}&maxResults=${maxResults}`;

console.log(filters);

  return filters;
});


async function search() {
  let response = await fetch(`https://www.googleapis.com/books/v1/volumes?${searchFilters.value}`);
  let json = await response.json();

  if (json.items) searchResults.value = json;
};
</script>

<template>
  <div class="container">
    <h2>Busqueda avanzada</h2>
    <div class="input-group mb-4">
      <input
        type="text"
        placeholder="Search..."
        class="form-control"
        v-model="q.key"
      >
      <div class="input-group-append">
        <button 
          type="button"
          class="btn" 
          @click="search()"
          :class="{
            disabled: !(q.key || q.author || q.publisher || q.category)
          }"
        >
          <img src="@/assets/icons/search-icon.svg" alt="Search">
        </button>
      </div>
    </div>

    <div class="accordion accordion-flush" id="extraFilters">
      <div class="accordion-item">
        <h2 class="accordion-header" id="extraFilters-header">
          <button
            class="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#extraFilters-body"
            aria-expanded="true"
            aria-controls="extraFilters-body"
          >
            Filters
          </button>
        </h2>
        <div id="extraFilters-body" class="accordion-collapse collapse show" aria-labelledby="extraFilters-header" data-bs-parent="#extraFilters">
          <div class="accordion-body">
            <div class="form-group">
              <label for="authorFilter">Author</label>
              <input
                type="text"
                id="authorFilter"
                placeholder="Search..."
                class="form-control"
                v-model="q.author"
              >
            </div>
            <div class="form-group">
              <label for="publisherFilter">Publisher</label>
              <input
                type="text"
                id="publisherFilter"
                placeholder="Search..."
                class="form-control"
                v-model="q.publisher"
              >
            </div>
            <div class="form-group">
              <label for="categoryFilter">Category</label>
              <input
                type="text"
                id="categoryFilter"
                placeholder="Search..."
                class="form-control"
                v-model="q.category"
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Results Options -->
    <div v-if="searchFilters && searchResults.items">
      <div class="row my-3 align-items-center">
        <div class="col-auto d-none d-md-block">{{ searchResults.totalItems }} resultados</div>
        <div class="col-auto ms-auto">
          <div>
            <router-link
              :to="{name: 'library', query: {...$route.query, mode: 'list'}}"
              role="button"
              class="btn btn-primary btn-sm ms-1"
              :class="{disabled: !viewMode || viewMode == 'list'}"
            >
              <img href="@/assets/icons/table-icon.svg" class="fonticon-table" />
              <span class="d-none d-md-inline">&nbsp;Ver lista</span>
            </router-link>
            <router-link
              :to="{name: 'library', query: {...$route.query, mode: 'card'}}"
              role="button"
              class="btn btn-primary btn-sm ms-1"
              :class="{disabled: viewMode == 'card'}"
            >
              <img href="@/assets/icons/grid-icon.svg" class="fonticon-table" />
              <span class="d-none d-md-inline">&nbsp;Ver cuadricula</span>
            </router-link>
          </div>
        </div>
      </div>
      <!-- searchResults Views -->
      <div
        v-if="viewMode == 'card'"
        class="row"
      >
        <CardView :data="searchResults.items" />
      </div>
      <div
        v-else
        class="row"
      >
        <TableView :data="searchResults.items" />
      </div>
      <!-- Pagination -->
      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
          <li
          class="page-item"
          :class="{disabled: startIndex == 0}"
          >
            <a
              class="page-link"
              @click="startIndex >= maxResults ? startIndex = (startIndex - maxResults):0"
              aria-label="Previous"
            >
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li class="page-item">
            <a
              class="page-link"
              @click="startIndex += maxResults"
              aria-label="Next"
            >
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
    <div v-else class="container-fluid p-4">
      <span>No hay resultados</span>
    </div>
  </div>
</template>
