import '@/assets/main.css';
import 'bootstrap/dist/css/bootstrap.css';

import { createApp, markRaw } from 'vue';
import App from '@/App.vue';

import { createPinia } from "pinia";
import "@/axios.js";
import router from '@/router/index.js';

const pinia = createPinia();

pinia.use(({ store }) => {
  store.router = markRaw(router);
});

const app = createApp(App);

app.use(pinia);
app.use(router);

app.mount('#app');

import 'bootstrap/dist/js/bootstrap.js';
