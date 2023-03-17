import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

/* tailwindcss */
import "tailwindcss/tailwind.css"
createApp(App).use(store).use(router).mount('#app')
