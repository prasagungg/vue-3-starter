import { createApp } from 'vue';
import './assets/css/index.css';
import App from './App.vue';
import routes from './routes';
import { createPinia } from 'pinia';
import { VueQueryPlugin } from '@tanstack/vue-query';
import {  vueQueryPluginOptions } from './libs';

const pinia = createPinia();

const app = createApp(App);

app.use(pinia);
app.use(routes);
app.use(VueQueryPlugin, vueQueryPluginOptions);


app.mount('#app');
