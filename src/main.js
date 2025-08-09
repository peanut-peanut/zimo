import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/globals.less'
import 'amfe-flexible'
// import './utils/flexible.js' // 使用自定义的flexible.js替代amfe-flexible

const app = createApp(App)

app.use(router)
app.mount('#app') 