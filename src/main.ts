import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import '@/common/styles/element.scss'
import directives from '@/utils/directives/index'

// createApp(App).mount('#app')

const app = createApp(App)
// 全局注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(directives)
app.use(router).use(createPinia()).mount('#app')
