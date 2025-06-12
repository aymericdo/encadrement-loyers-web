import * as Sentry from "@sentry/vue";
import { createApp } from "vue";
import App from "./App.vue";
import "./assets/index.css";
import router from "./router";

const app = createApp(App);

Sentry.init({
  app,
  dsn: import.meta.env.SENTRY_DNS,
  environment: import.meta.env.NODE_ENV,
});

console.log('test')

app.use(router);
app.mount("#app");
