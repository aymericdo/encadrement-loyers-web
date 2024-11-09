import * as Sentry from "@sentry/vue";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

Sentry.init({
  app,
  project: "web",
  environment: process.env.NODE_ENV,
  dsn: process.env.VUE_APP_SENTRY_DSN,
});

const app = createApp(App);
app.use(router).mount("#app");
