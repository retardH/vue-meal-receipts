import "./style.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
// @ts-ignore
import { setUpi18n } from "@/i18n";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";
const pinia = createPinia();
pinia.use(piniaPluginPersistedState);
const app = createApp(App);
setUpi18n(app);
app.use(pinia);
app.use(router);
app.mount("#app");
