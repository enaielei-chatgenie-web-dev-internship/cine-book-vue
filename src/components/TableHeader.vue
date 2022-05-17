<script setup>
import {reactive, ref} from "vue";
import useStore from "./../stores/store.js";

const store = useStore();

const props = defineProps([
    "selectAll", "deselectAll", "invertSelection", "deleteSelected"
]);

function print(...params) {console.log(...params)}
</script>

<template>
    <thead>
        <tr>
            <th colspan="4" class="right aligned">
                <button class="ui tiny compact button select all" title="Select all"
                    @click="selectAll()">
                    All
                </button>
                <button class="ui tiny compact button select none" title="Deselect all"
                    @click="deselectAll()">
                    None
                </button>
                <button class="ui tiny compact button select invert" title="Invert selection"
                    @click="invertSelection()">
                    Invert
                </button>
                <button class="ui tiny compact icon button delete selected" title="Delete selected"
                    @click="deleteSelected()">
                    <i class="trash alternate icon"></i>
                </button>
            </th>
        </tr>
        <tr>
            <slot />
        </tr>
    </thead>
</template>

<style scoped>
</style>