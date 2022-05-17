<script setup>
import {reactive, ref} from "vue";
import useStore from "./../stores/store.js";

const store = useStore();

const props = defineProps({
    page: {default: 1},
    pages: {default: 2},

    pageParam: {default: "page"},

    options: {default: {}},
    htmlOptions: {default: {}},
    firstLabel: {default: "First"},
    previousLabel: {default: "<"},
    lastLabel: {default: "Last"},
    nextLabel: {default: ">"},
    
    pagesDisplay: {default: 2},
    lowerPagesDisplay: {default: 2},
    upperPagesDisplay: {default: 2}
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