import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'

// createApp(App).use(store).use(router).mount('#app')
createApp(App).use(router).mount('#app')