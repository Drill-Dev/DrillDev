// eslint-disable-next-line import/no-unresolved
import 'virtual:windi.css';

import { createApp } from 'vue';

import App from './app.vue';
import { router } from './router';

const app = createApp(App);
app.use(router);
app.mount('#app');
