import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';


import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './assets/_bootswatch.scss';
import './assets/_variables.scss';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(createPinia());
app.use(router);

app.mount('#app');
