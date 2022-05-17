<script setup>
import {reactive, ref} from "vue";
import useStore from "./../stores/store.js";

const store = useStore();

function genNav(url, active, text, icon, data=null) {
    return {
        get url() {
            return url();
        },
        get active() {
            return active();
        },
        text, icon, data,
        get visible() {
            return this.url != null;
        }
    };
}

const navs = ref([
    genNav(
        () => !store.signedIn ? "#" : null,
        () => true,
        "Auth",
        "orange lock",
        null
    ),
    genNav(
        () => store.signedIn ? "#" : null,
        () => store.route.name  == "root",
        "Overview",
        "orange eye",
        null
    ),
    genNav(
        () => store.signedIn ? "/cinemas" : null,
        () => store.route.name  == "cinemas",
        "Cinemas",
        "orange theater masks",
        null
    ),
    genNav(
        () => store.signedIn ? "/movies" : null,
        () => store.route.name  == "movies",
        "Movies",
        "orange film",
        null
    ),
    genNav(
        () => store.signedIn?.admin ? "/timeslots" : null,
        () => store.route.name  == "timeslots",
        "Timeslots",
        "orange clock",
        null
    ),
    genNav(
        () => store.signedIn ? "#" : null,
        () => store.route.name  == "showings",
        "Showings",
        "orange tv",
        null
    ),
    genNav(
        () => store.signedIn ? "#" : null,
        () => store.route.name  == "bookings",
        "Bookings",
        "orange clipboard list",
        null
    ),
    genNav(
        () => store.signedIn ? "#" : null,
        () => false,
        "Sign Out",
        "orange sign out alternate",
        null
    ),
]);
</script>

<template>
    <div id="navigation-parent" class="four wide column">
        <nav id="navigation" class="ui fluid vertical pointing compact menu">
            <template v-for="nav, key in navs">
                <router-link
                    :key="key"
                    v-if="nav.visible"
                    :to="nav.url" :class="['item', {active: nav.active}]">
                    <i :class='["icon", nav.icon]'></i>{{nav.text}}
                </router-link>
            </template>
        </nav>
    </div>
</template>

<style scoped>
</style>