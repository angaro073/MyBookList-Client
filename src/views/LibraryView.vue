<script setup>
import TableView from '@/components/TableView.vue';
import CardView from '@/components/CardView.vue';

import { computed, onMounted, watch } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

import SpinnerBorder from '@/components/SpinnerBorder.vue';

import { useLibraryStore } from '@/stores/library';

const libraryStore = useLibraryStore();

onMounted(() => {
  let query = useRoute().query;

  if (Object.keys(query).length != 0) {
    libraryStore.clearFilters();

    if (query.q) libraryStore.qKey = query.q;
    if (query.author) libraryStore.authorKey = query.author;
    if (query.publisher) libraryStore.publisherKey = query.publisher;
    if (query.category) libraryStore.categoryKey = query.category;

    libraryStore.search();
  }
});

const viewMode = computed(() => useRoute().query.mode);

watch(
  [
    () => libraryStore.q,
    () => libraryStore.author,
    () => libraryStore.publisher,
    () => libraryStore.category
  ],
  () => {
    libraryStore.startIndex = 0;
  }
);
</script>

<style scoped>
#extraFilters .accordion-button {
  background-color: #958fca;
}

#extraFilters .accordion-button:focus {
  outline: none;
  box-shadow: none;
}

#extraFilters-body .accordion-body {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

#extraFilters-body {
  background-color: #aba6d5;
}
</style>

<template>
  <div class="container">
    <h2>Advanced search</h2>
    <div class="input-group mb-4">
      <input
        type="text"
        placeholder="Search..."
        class="form-control"
        autofocus
        v-model="libraryStore.qKey"
      />
      <div class="input-group-append">
        <button
          type="submit"
          class="btn"
          @click="libraryStore.search()"
          :disabled="
            !(
              libraryStore.q ||
              libraryStore.author ||
              libraryStore.publisher ||
              libraryStore.category
            )
          "
        >
          <img src="@/assets/icons/search-icon.svg" alt="Search" />
        </button>
      </div>
    </div>

    <div class="accordion d-flex justify-content-center" id="extraFilters">
      <div class="accordion-item">
        <h2 class="accordion-header" id="extraFilters-header">
          <button
            type="button"
            class="accordion-button bg-gradient collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#extraFilters-body"
            aria-expanded="false"
            aria-controls="extraFilters-body"
          >
            Filters
          </button>
        </h2>
        <div
          id="extraFilters-body"
          class="accordion-collapse collapse"
          aria-labelledby="extraFilters-header"
          data-bs-parent="#extraFilters"
        >
          <div class="accordion-body">
            <div class="form-group">
              <label for="authorFilter">Author</label>
              <input
                id="authorFilter"
                type="text"
                class="form-control"
                v-model="libraryStore.authorKey"
              />
            </div>
            <div class="form-group">
              <label for="publisherFilter">Publisher</label>
              <input
                type="text"
                id="publisherFilter"
                class="form-control"
                v-model="libraryStore.publisherKey"
              />
            </div>
            <div class="form-group">
              <label for="categoryFilter">Category</label>
              <input
                type="text"
                id="categoryFilter"
                class="form-control"
                v-model="libraryStore.categoryKey"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Results Options -->
    <SpinnerBorder v-if="libraryStore.inSearch" />
    <div v-else>
      <div v-if="libraryStore.results && libraryStore.results.items">
        <div class="row my-3 align-items-center">
          <div class="col-auto d-inline">{{ libraryStore.results.totalItems }} results</div>
          <div class="col-auto ms-auto">
            <router-link
              :to="{ name: 'library', query: { ...$route.query, mode: 'list' } }"
              role="button"
              class="btn btn-primary btn-sm ms-1"
              :disabled="!viewMode || viewMode == 'list'"
            >
              <!-- <img href="@/assets/icons/table-icon.svg" class="fonticon-table" /> -->
              <span class="d-inline">&nbsp;List</span>
            </router-link>
            <router-link
              :to="{ name: 'library', query: { ...$route.query, mode: 'card' } }"
              role="button"
              class="btn btn-primary btn-sm ms-1"
              :disabled="viewMode == 'card'"
            >
              <!-- <img href="@/assets/icons/grid-icon.svg" class="fonticon-table" /> -->
              <span class="d-inline">&nbsp;Grid</span>
            </router-link>
          </div>
        </div>
        <!-- results Views -->
        <div v-if="viewMode == 'card'" class="row">
          <CardView :data="libraryStore.results.items" />
        </div>
        <div v-else class="row">
          <TableView :data="libraryStore.results.items" />
        </div>
        <!-- Pagination -->
        <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-center">
            <li class="page-item">
              <a
                class="page-link"
                :class="{ disabled: libraryStore.index == 0 }"
                aria-label="Previous"
                @click="libraryStore.searchPrevious()"
              >
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li class="page-item">
              <a class="page-link" aria-label="Next" @click="libraryStore.searchNext()">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div v-else class="container-fluid p-4">
        <span>Results Not Found...</span>
      </div>
    </div>
  </div>
</template>
