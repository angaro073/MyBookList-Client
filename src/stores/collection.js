import { defineStore } from 'pinia';
import axios from 'axios';

export const useCollectionStore = defineStore('collection', {
  state: () => ({
    collections: ['pending', 'reading', 'completed', 'paused', 'dropped'],
    state: 'pending',
    progress: 0,
    score: 0,
    processResults: null,
    inCollectionProcess: false
  }),
  getters: {
    inProcess: (state) => state.inCollectionProcess,
    results: (state) => state.processResults
  },
  actions: {
    clear() {
      console.log('Clearing data...');
      this.state = 'pending';
      this.progress = 0;
      this.score = 0;
      this.processResults = null;
    },
    save(data) {
      let sessionToken = sessionStorage.getItem('sessionToken');

      if (sessionToken) {
        data.state = this.state;
        data.progress = this.progress;
        data.score = this.score;

        this.inCollectionProcess = true;

        let options = {
          headers: {
            Authorization: `Bearer ${sessionToken}`
          }
        };
        axios.post('/collection', data, options).then(
          (response) => {
            this.inCollectionProcess = false;

            this.state = response.data.state;
            this.progress = response.data.progress;
            this.score = response.data.score;

            this.processResults = response.data;
          },
          (error) => {
            this.inCollectionProcess = false;

            console.log(error);
          }
        );
      }
    },
    delete(userId, bookId) {
      let sessionToken = sessionStorage.getItem('sessionToken');
      if (sessionToken) {
        this.inCollectionProcess = true;

        let options = {
          headers: {
            Authorization: `Bearer ${sessionToken}`
          }
        };
        axios.delete(`/collection/${userId}/${bookId}`, options).then(
          (response) => {
            this.inCollectionProcess = false;
            this.clear();
          },
          (error) => {
            this.inCollectionProcess = false;

            this.clear();
            console.log(error);
          }
        );
      }
    },
    get(userId, bookId) {
      let sessionToken = sessionStorage.getItem('sessionToken');
      if (sessionToken) {
        this.inCollectionProcess = true;

        let options = {
          headers: {
            Authorization: `Bearer ${sessionToken}`
          }
        };
        axios.get(`/collection/${userId}/${bookId}`, options).then(
          (response) => {
            this.inCollectionProcess = false;

            this.state = response.data.state;
            this.progress = response.data.progress;
            this.score = response.data.score;

            this.processResults = response.data;
          },
          (error) => {
            this.inCollectionProcess = false;
            this.clear();
            console.log(error);
          }
        );
      }
    },
    getByState(userId, state) {
      let sessionToken = sessionStorage.getItem('sessionToken');
      if (sessionToken) {
        this.inCollectionProcess = true;
        this.processResults = null;

        let options = {
          headers: {
            Authorization: `Bearer ${sessionToken}`
          }
        };
        axios.get(`/collection/${userId}?state=${state}`, options).then(
          (response) => {
            this.inCollectionProcess = false;

            this.processResults = response.data;
          },
          (error) => {
            this.inCollectionProcess = false;
            console.log(error);
          }
        );
      }
    }
  }
});
