import { defineStore } from "pinia";
import axios from "axios";

export const useCollectionStore = defineStore("collection", {
  state: () => ({
    collections: ['pending','reading','completed','paused','dropped'], // Enum?
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
    clear(){
console.log('Clearing data...');
      this.state = 'pending';
      this.progress = 0;
      this.score = 0;
      this.processResults = null;
    },
    save(data){
      let sessionToken = sessionStorage.getItem('sessionToken');

      if (sessionToken) {
//
console.log(`sessionToken: ${sessionToken}`);
console.log(data);
console.log('Saving collection data...');
//
        data.state = this.state;
        data.progress = this.progress;
        data.score = this.score;

        this.inCollectionProcess = true;

        let options = {
          headers: {
            Authorization: `Bearer ${sessionToken}`
          }
        }
        axios.post('/collection', data, options)
        .then(
          (response) => {
            this.inCollectionProcess = false;

            this.state = response.data.state;
            this.progress = response.data.progress;
            this.score = response.data.score;

            this.processResults = response.data;
//
console.log(response);
//
          },
          (error) => {
            this.inCollectionProcess = false;
//
console.log(error);
//
          }
        );
      }
    },
    delete(userId, bookId){
//
console.log(`userId: ${userId}`);
console.log(`bookId: ${bookId}`);
//

      let sessionToken = sessionStorage.getItem('sessionToken');
//
console.log(`sessionToken: ${sessionToken}`);
//
      if (sessionToken) {
        this.inCollectionProcess = true;
//
console.log('Deleting data...');
//
        let options = {
          headers: {
            Authorization: `Bearer ${sessionToken}`
          }
        }
        axios.delete(`/collection/${userId}/${bookId}`, options)
        .then(
          (response) => {
//
console.log(response);
//
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
    get(userId, bookId){
//
console.log(`userId: ${userId}`);
console.log(`bookId: ${bookId}`);
//

      let sessionToken = sessionStorage.getItem('sessionToken');
//
console.log(`sessionToken: ${sessionToken}`);
//
      if (sessionToken) {
        this.inCollectionProcess = true;
//
console.log('Getting collection registry...');
//
        let options = {
          headers: {
            Authorization: `Bearer ${sessionToken}`
          }
        }
        axios.get(`/collection/${userId}/${bookId}`, options)
        .then(
          (response) => {
//
console.log(response);
//
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
//
console.log(`userId: ${userId}`);
console.log(`state: ${state}`);
//
      let sessionToken = sessionStorage.getItem('sessionToken');
//
console.log(`sessionToken: ${sessionToken}`);
//
      if (sessionToken) {
        this.inCollectionProcess = true;
        this.processResults = null;
//
console.log(`Getting collection ${state}...`);
//
        let options = {
          headers: {
            Authorization: `Bearer ${sessionToken}`
          }
        }
        axios.get(`/collection/${userId}?state=${state}`, options)
        .then(
          (response) => {
//
console.log(response);
//
            this.inCollectionProcess = false;

            this.processResults = response.data;
          },
          (error) => {
            this.inCollectionProcess = false;
            this.processResults = null;
            console.log(error);
          }
        );
      }
    }
  }
});