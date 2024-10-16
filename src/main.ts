import '@progress/kendo-theme-default/dist/all.css';
import '@jsonforms/vue-vanilla/vanilla.css';
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App);
app.config.warnHandler = () => null;

app.use(router)

app.mount('#app')
