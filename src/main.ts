import { createApp } from 'vue'
import './style.css'
import App from './App.vue'


import { router, setupRouter } from '@/router';


const app = createApp(App);




// Configure routing
// 配置路由
setupRouter(app);








app.mount('#app')
