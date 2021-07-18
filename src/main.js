import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/reset.css'
// 自动设置rem基准值
import 'amfe-flexible'

createApp(App).use(store).use(router).mount('#app')
