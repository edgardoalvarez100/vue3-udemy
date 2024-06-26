import { createApp } from "vue";
import router from "./router";
import { createPinia } from "pinia";

import App from "./App.vue";
// import "ant-design-vue/es/message/style/css";

createApp(App).use(router).use(createPinia()).mount("#app");
