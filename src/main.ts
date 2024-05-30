import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';


import 'bootstrap/dist/css/bootstrap.css';
import './assets/_bootswatch.scss';
import './assets/_variables.scss';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
