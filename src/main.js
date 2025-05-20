import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./style.css";

import { registerSW } from 'virtual:pwa-register'

const updateSW = registerSW({
  onNeedRefresh() {
    console.log('New content available, please refresh.')
  },
  onOfflineReady() {
    console.log('App ready to work offline')
  },
})

const app = createApp(App)
app.use(router)
app.mount('#app')
