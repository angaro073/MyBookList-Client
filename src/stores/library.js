import { defineStore } from 'pinia';
import axios from 'axios';

export const useLibraryStore = defineStore('library', {
  state: () => ({
    qKey: '',
    authorKey: '',
    publisherKey: '',
    categoryKey: '',

    searchResults: null,
    maxResults: 12,
    startIndex: 0,
    inSearchProcess: false
  }),
  getters: {
    q: (state) => state.qKey,
    author: (state) => state.authorKey,
    publisher: (state) => state.publisherKey,
    category: (state) => state.categoryKey,

    results: (state) => state.searchResults,
    index: (state) => state.startIndex,
    inSearch: (state) => state.inSearchProcess
  },
  actions: {
    clearFilters() {
      //
      console.log('Clearing data...');
      //
      this.qKey = '';
      this.authorKey = '';
      this.publisherKey = '';
      this.categoryKey = '';
      this.startIndex = 0;
    },
    searchPrevious() {
      this.startIndex = this.startIndex >= this.maxResults ? this.startIndex - this.maxResults : 0;
      //
      console.log('Index: ' + this.index);
      //
      this.search();
    },
    searchNext() {
      this.startIndex += this.maxResults;
      //
      console.log('Index: ' + this.index);
      //
      this.search();
    },
    search() {
      this.searchResults = null;
      if (this.qKey || this.authorKey || this.publisherKey || this.categoryKey) {
        this.inSearchProcess = true;
        //
        console.log('Searching...');
        //
        let filters = 'q=';

        if (this.qKey) filters += `${this.qKey}`;
        if (this.authorKey) filters += ` inauthor:${this.authorKey}`;
        if (this.publisherKey) filters += ` inpublisher:${this.publisherKey}`;
        if (this.categoryKey) filters += ` subject:${this.categoryKey}`;

        filters = filters.trim().replace(/ /g, '+');
        filters += `&printType=books&fields=totalItems,items(id,volumeInfo(title,authors,publisher,categories,imageLinks/smallThumbnail))&startIndex=${this.startIndex}&maxResults=${this.maxResults}`;
        //
        console.log(filters);
        //
        axios.get(`https://www.googleapis.com/books/v1/volumes?${filters}`).then(
          (response) => {
            this.inSearchProcess = false;
            //
            console.log(response.data);
            //
            if (response.data) this.searchResults = response.data;
          },
          (error) => {
            this.inSearchProcess = false;
            console.log(error);
          }
        );
      }
    },
    getBook(bookId) {
      //
      console.log('Getting book...');
      //
      this.inSearchProcess = true;
      axios
        .get(
          `https://www.googleapis.com/books/v1/volumes/${bookId}?fields=id,volumeInfo(title,industryIdentifiers,authors,publisher,publishedDate,description,pageCount,categories,imageLinks,language),saleInfo/buyLink`
        )
        .then(
          (response) => {
            this.inSearchProcess = false;
            //
            console.log(response);
            //
            if (response.data) this.searchResults = response.data;
          },
          (error) => {
            this.inSearchProcess = false;
            console.log(error);
          }
        );
    }
  }
});
