<script setup>
import {reactive, ref} from "vue";
import useStore from "./../stores/store.js";

const store = useStore();

const props = defineProps({
    title: String,
    subtitle: String
});
</script>

<template>
    <h2 class="ui header">
        {{title}}
        <div class="sub header">{{subtitle}}</div>
    </h2>
</template>

<style scoped>
</style>