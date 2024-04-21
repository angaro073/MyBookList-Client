<script setup>
import { onMounted, computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

import SpinnerBorder from '@/components/SpinnerBorder.vue';

import { useAuthStore } from '@/stores/auth';
const authStore = useAuthStore();

import { useLibraryStore } from '@/stores/library';
const libraryStore = useLibraryStore();

import { useCollectionStore } from '@/stores/collection';
const collectionStore = useCollectionStore();

const bookId = computed (() => { return useRoute().params.bookId });

onMounted(() => {
  if (bookId.value) libraryStore.getBook(bookId.value);
});

function updateModal() {
console.log('Update...')
  if (bookId.value && authStore.user.id) {
//
console.log(authStore.user);
//
    collectionStore.get(authStore.user.id, bookId.value);
  }
}

function saveData() {
  if(
    (authStore.user && authStore.user.id)
    && bookId.value 
    && (libraryStore.results && libraryStore.results.volumeInfo)
    && libraryStore.results.volumeInfo.title
    && libraryStore.results.volumeInfo.pageCount
  ){
    collectionStore.save({
      "user_id": authStore.user.id,
      "book_id": bookId.value,
      "title": libraryStore.results.volumeInfo.title,
      "pageCount": libraryStore.results.volumeInfo.pageCount
    });
    // updateModal();
  }
}

function deleteData() {
  if ((authStore.user && authStore.user.id) && bookId.value) {
    collectionStore.delete(authStore.user.id, bookId.value);
  }
}
</script>

<template>

  <SpinnerBorder v-if="libraryStore.inProcess" />
  <div v-else>
    <div
      v-if="libraryStore.results && libraryStore.results.volumeInfo"
      class="container-fluid"
    >
      <!-- Button trigger modal -->
      <div
        v-if="authStore.user"
        class="d-flex fixed-bottom justify-content-end me-5 mb-5"
      >
        <button
          type="button"
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#feedbackForm"
          @click="updateModal"
        >+</button>

        <div class="modal fade" id="feedbackForm" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="feedbackFormLabel" aria-hidden="true">
          <div class="modal-dialog modal-fullscreen modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="feedbackFormLabel">{{ libraryStore.results.volumeInfo.title }}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
  
              <SpinnerBorder v-if="collectionStore.inProcess" />
              <form v-else @submit.prevent="saveData" @reset="deleteData">
                <div class="modal-body container-fluid w-75 mt-lg-5 mt-2">
                    <div class="form-outline mb-4 container-fluid row gy-2">
  
                      <div
                        class="container-fluid text-center d-md-inline px-2"
                      >
  
                          <input type="radio" class="btn-check" v-model="collectionStore.state" :id="collectionStore.collections[0]" autocomplete="off" :value="collectionStore.collections[0]">
                          <label class="btn btn-secondary" :for="collectionStore.collections[0]">{{ collectionStore.collections[0] }}</label>
  
                          <input type="radio" class="btn-check" v-model="collectionStore.state" :id="collectionStore.collections[1]" autocomplete="off" :value="collectionStore.collections[1]">
                          <label class="btn btn-secondary" :for="collectionStore.collections[1]">{{ collectionStore.collections[1] }}</label>
  
                          <input type="radio" class="btn-check" v-model="collectionStore.state" :id="collectionStore.collections[2]" autocomplete="off" :value="collectionStore.collections[2]">
                          <label class="btn btn-secondary" :for="collectionStore.collections[2]">{{ collectionStore.collections[2] }}</label>
  
                          <input type="radio" class="btn-check" v-model="collectionStore.state" :id="collectionStore.collections[3]" autocomplete="off" :value="collectionStore.collections[3]">
                          <label class="btn btn-secondary" :for="collectionStore.collections[3]">{{ collectionStore.collections[3] }}</label>
  
                          <input type="radio" class="btn-check" v-model="collectionStore.state" :id="collectionStore.collections[4]" autocomplete="off" :value="collectionStore.collections[4]">
                          <label class="btn btn-secondary" :for="collectionStore.collections[4]">{{ collectionStore.collections[4] }}</label>
  
                      </div>
  
                      <label class="form-label" for="progressInput">Progress</label>
                      <div class="row gy-2 justify-content-center">
                        <div class="input-group">
                          <input
                            id="progressInput"
                            type="number"
                            class="form-control"
                            v-model="collectionStore.progress"
                            min="0"
                            :max="libraryStore.results.volumeInfo.pageCount"
                          />
                          <div class="input-group-append">
                            <span class="input-group-text" id="basic-addon2">/{{ libraryStore.results.volumeInfo.pageCount }}</span>
                          </div>
                        </div>
                      </div>
  
                      <div class="row gy-2 justify-content-center">
                        <label class="form-label row px-0" for="scoreInput">
                          <span>Score</span>
                          <span class="text-center">{{ collectionStore.score }}</span>
                        </label>
                        <input
                          id="scoreInput"
                          type="range"
                          class="form-range"
                          v-model="collectionStore.score"
                          min="0"
                          max="5"
                        />
                      </div>
                      
                    </div>
                </div>
                <div 
                  class="modal-footer fixed-bottom d-inline-flex"
                  :class="{
                    'justify-content-between': collectionStore.results,
                    'justify-content-end': !collectionStore.results
                  }"
                >
                  <button
                    v-if="collectionStore.results"
                    type="reset"
                    class="btn btn-danger"
                  >Delete</button>
                  <button
                    type="submit"
                    class="btn btn-primary"
                  >Save</button>
                </div>
              </form>
  
            </div>
          </div>
        </div>
      </div>

      <div class="d-flex flex-column flex-md-row">
  
        <div class="order-1 order-md-0 m-auto p-2">
            <div>
              <h2>{{ libraryStore.results.volumeInfo.title }}</h2>
            </div>
            <div>
              <small>{{ `${libraryStore.results.volumeInfo.authors} - ${libraryStore.results.volumeInfo.publishedDate}` }}</small>
            </div>
            <div
              v-if="libraryStore.results.saleInfo && libraryStore.results.saleInfo.buyLink"
              class="d-flex justify-content-center"
            >
              <a
                class="btn btn-primary"
                :href="libraryStore.results.saleInfo.buyLink">
                Get Now
              </a>
            </div>
        </div>

        <div
          v-if="libraryStore.results.volumeInfo.imageLinks && libraryStore.results.volumeInfo.imageLinks.smallThumbnail"
          class="order-0 order-md-1 p-2"
        >
          <img
            :src="libraryStore.results.volumeInfo.imageLinks.smallThumbnail"
            class="img-fluid card-img-top"
          />
        </div>
        <div
          v-else
          class="order-0 order-md-1 p-2"
        >
          <img
            src="@/assets/icons/book-icon.svg"
            alt="book-icon"
            class="img-fluid card-img-top"
          />
        </div>
      </div>
      
      <div class="container-fluid mt-4">
        <!-- <div class="container-fluid mb-4 border-bottom">
          <div class="container">
            <ul class="nav nav-tabs justify-content-center">
              <li class="nav-item">
                <a class="nav-link active">Summary</a>
              </li>
              <li class="nav-item">
                <a class="nav-link text-reset">Get now</a>
              </li>
            </ul>
          </div>
        </div> -->
  
        <div class="container">
          <div class="mt-4 mb-3 ms-3">
            <h5>About this book...</h5>
          </div>
          <div class="card mb-2">
  
            <div class="list-group list-group-flush">
              <div class="list-group-item p-4">
                <div class="d-flex flex-column flex-md-row justify-content-between">
                  <div>
                    <div v-for="(isbn,index) in libraryStore.results.volumeInfo.industryIdentifiers" :key="index">{{ isbn.type }}: {{ isbn.identifier }}</div>
                    <div>Published date: {{ libraryStore.results.volumeInfo.publishedDate }}</div>
                    <div>Authors:
                      <router-link :to="{name: 'library', query: {author: libraryStore.results.volumeInfo.authors}}">
                        {{ libraryStore.results.volumeInfo.authors }}
                      </router-link>
                    </div>
                  </div>
                  <div>
                    <div>Publisher:
                      <router-link :to="{name: 'library', query: {publisher: libraryStore.results.volumeInfo.publisher}}">
                        {{ libraryStore.results.volumeInfo.publisher }}
                      </router-link>
                    </div>
                    <div>Categories:
                      <router-link :to="{name: 'library', query: {category: libraryStore.results.volumeInfo.categories}}">
                        {{ libraryStore.results.volumeInfo.categories }}
                      </router-link>
                    </div>
                    <div>Page count: {{ libraryStore.results.volumeInfo.pageCount }}</div>
                    <div>Language: {{ libraryStore.results.volumeInfo.language }}</div>
                  </div>
                </div>
              </div>
              <div class="list-group-item p-4" v-html="libraryStore.results.volumeInfo.description"></div>
            </div>

          </div>
        </div>

      </div>
    </div>
    <div v-else class="container-fluid p-4">
      <span>Results Not Found...</span>
    </div>
  </div>
</template>