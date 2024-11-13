import * as Sentry from "@sentry/vue";
import { createApp } from "vue";
import App from "./App.vue";
import "./assets/index.css";
import router from "./router";

const app = createApp(App);

Sentry.init({
  app,
  dsn: "https://285198e42e2227ea3fe1615cb98b1e6c@o4507146908139520.ingest.de.sentry.io/4508270551171152",
  environment: import.meta.env.NODE_ENV,
});

app.use(router);
app.mount("#app");
