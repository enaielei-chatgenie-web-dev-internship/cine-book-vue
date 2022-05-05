import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import { provide, h } from "vue";
import { DefaultApolloClient } from '@vue/apollo-composable';
import { client } from "./assets/apollo";

const app = createApp({
    setup() {
        provide(DefaultApolloClient, client);
    },
    render() {
        return h(App);
    }
});

app.use(createPinia());
app.use(router);

app.mount("#app");