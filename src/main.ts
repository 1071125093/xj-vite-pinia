import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import directives from './directives'
import { createPinia } from 'pinia'
createApp(App).use(router).use(createPinia()).use(directives).mount('#app')
