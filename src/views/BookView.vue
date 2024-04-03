<script setup>
import { onMounted, computed, ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

const bookId = computed (() => { return useRoute().params.bookId });

const searchResults = ref('');

onMounted(async () => {
  if (bookId.value) {
    let response = await fetch(`https://www.googleapis.com/books/v1/volumes/${bookId.value}?fields=id,volumeInfo(title,industryIdentifiers,authors,publisher,publishedDate,description,pageCount,categories,imageLinks,language)`);
    let json = await response.json();

// console.log(response.status);
console.log(json);

    if (json.volumeInfo) searchResults.value = json;
  }
});
</script>

<template>
  <div
    v-if="searchResults"
    class="container-fluid"
  >

    <div class="d-flex flex-column flex-md-row">

      <div class="order-1 order-md-0 m-auto p-2">
        <div>
          <div>
            <h2>{{ searchResults.volumeInfo.title }}</h2>
          </div>
          <div>
            <small>{{ searchResults.volumeInfo.authors }} - {{ searchResults.volumeInfo.publishedDate }}</small>
          </div>
          <div>
            <!-- modal add feedback -->
          </div>
        </div>
      </div>



      <div class="order-0 order-md-1 p-2">
        <img
          v-if="searchResults.volumeInfo.imageLinks.smallThumbnail"
          :src="searchResults.volumeInfo.imageLinks.smallThumbnail"
          class="img-fluid card-img-top"
        />
        <img
        v-else
          src="../assets/icons/book-icon.svg"
          alt="book-icon"
          class="img-fluid card-img-top"
        />
      </div>

    </div>
    
    <div class="container-fluid mt-4">
      <!-- navbar -->
      <div class="container-fluid mb-4 border-bottom">
        <div class="container">
          <ul class="nav nav-tabs justify-content-center">
            <li class="nav-item">
              <a class="nav-link active" href="#">Resumen</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-reset" href="#">Obtener el libro</a>
            </li>
          </ul>
        </div>
      </div>

      <div class="container">
        <div class="mt-4 mb-3 ms-3">
          <h5>Acerca de esta coleccion</h5>
        </div>
        <div class="card mb-2">

          <div class="list-group list-group-flush">
            <div class="list-group-item p-4">
              <div class="d-flex flex-column flex-md-row justify-content-between">
                <div>
                  <div v-for="(isbn,index) in searchResults.volumeInfo.industryIdentifiers" :key="index">{{ isbn.type }}: {{ isbn.identifier }}</div>
                  <div>Fecha de publicacion: {{ searchResults.volumeInfo.publishedDate }}</div>
                  <div>Autores:
                    <router-link :to="{name: 'library', query: {author: searchResults.volumeInfo.authors}}">
                      {{ searchResults.volumeInfo.authors }}
                    </router-link>
                  </div>
                </div>
                <div>
                  <div>Editor:
                    <router-link :to="{name: 'library', query: {publisher: searchResults.volumeInfo.publisher}}">
                      {{ searchResults.volumeInfo.publisher }}
                    </router-link>
                  </div>
                  <div>Categorias:
                    <router-link :to="{name: 'library', query: {category: searchResults.volumeInfo.categories}}">
                      {{ searchResults.volumeInfo.categories }}
                    </router-link>
                  </div>
                  <div>Cantidad de paginas: {{ searchResults.volumeInfo.pageCount }}</div>
                  <div>Idioma: {{ searchResults.volumeInfo.language }}</div>
                </div>
              </div>
            </div>
            <div class="list-group-item p-4">{{ searchResults.volumeInfo.description }}</div>
          </div>

        </div>
      </div>

    </div>
  </div>
  <div v-else class="container-fluid p-4">
    <span>No hay resultados</span>
  </div>
</template>