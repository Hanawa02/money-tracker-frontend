import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import "./index.css";
import router from "./router";
import i18n from "./locales";

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.use(i18n);

app.mount("#app");
