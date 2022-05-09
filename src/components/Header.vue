<script setup>
import AppTitle from "./AppTitle.vue";
</script>

<template>
  <header>
      <h1 class="ui header">
          <router-link to="/" class="ui image">
              <img src="./../assets/movies.png" alt="" srcset="">
          </router-link>
          <div class="content">
              <AppTitle />
              <div class="sub header">Your companion for movie booking.</div>
          </div>
      </h1>

      <div class="ui divider"></div>
  </header>
</template>

<style scoped>
</style>
