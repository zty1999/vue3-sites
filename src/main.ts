import { createApp } from 'vue'
import App from './App.vue'
import { router, setupRouter } from '@/router';
import { setupTouch } from './directives/hammerjs';
import { setUpVuetify } from './plugins/vuetify';
import { setupVueUse } from './plugins/vueuse';
// import '@/utils/index'



// CSS base style sheet
import '@/assets/styles/normalize.css';
import 'uno.css';
import 'animate.css';
import '@/assets/styles/hover.css';
import './style.css'




const app = createApp(App);




// Configure routing
// 配置路由
setupRouter(app);

// ui框架 vuetify
setUpVuetify(app)


// 移动端触摸 
setupTouch(app);


// @vueuse 相关
setupVueUse(app)







app.mount('#app')
