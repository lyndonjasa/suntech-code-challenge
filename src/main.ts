import './assets/main.css'
import '@progress/kendo-theme-default/dist/all.css';
import '@jsonforms/vue-vanilla/vanilla.css';

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
