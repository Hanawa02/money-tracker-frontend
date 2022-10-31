import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import "./index.css";
import routes from "./routes";
import { createPinia } from "pinia";

const app = createApp(App);
app.use(routes);
app.use(createPinia());
// app.use(i18n);

app.mount("#app");
