<script setup>
import { RouterLink, RouterView } from "vue-router";

import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import Navigation from "./components/Navigation.vue";
import Messages from "./components/Messages.vue";

import useStore from "./stores/store";

const store = useStore();
</script>

<template>
    <div id="main-content" class="ui piled text container segment">
        <Header />
        <Messages :messages="store.messages"/>
        <div class="ui grid">
          <Navigation />
          <div class="ui twelve wide stretched column">
            <div id="right-content" class="ui segment">
              <router-view></router-view>
            </div>
          </div>
          <Footer />
        </div>
    </div>
</template>

<script>

console.log(this);
</script>

<style lang="scss">
@import "@/assets/base.scss";
</style>
