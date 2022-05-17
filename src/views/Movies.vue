<script setup>
import {reactive, ref, computed, nextTick, onUpdated, onBeforeMount} from "vue";

import PageHeader from "./../components/PageHeader.vue";
import TableHeader from "./../components/TableHeader.vue";

import useStore from "./../stores/store.js";

const store = useStore();

onUpdated(() => {
    selector.initialize();
});

onBeforeMount(() => {
    if(!store.signedIn) store.router.push({name: "root"});
});

const movie = reactive({
    title: "",
    description: "",
});

function submit() {
    store.createMovie(movie, (r) => {
        store.$state._movies.refetch();
        store.setMessages(...r.data.createMovie.messages);
    });
}

function deleteSelected() {
    const selected = selector.selectedValues;
    if(selected.length == 0 ||
        !confirm(`Are you sure you want to delete the ${selected.length} selected record(s)?`))
        return;
    
    // $(selector.selected).each((e) => selector.deselect(e));
    const ph = selected.map((e) => "?").join(", ");
    store.destroyMovie({
        condition: `id in (${ph})`,
        values: selected
    }, (r) => {
        store.$state._movies.refetch();
        store.setMessages(...r.data.destroyMovie.messages);
    })
}
</script>

<template>
    <PageHeader title="Movies" :subtitle='store.signedIn?.admin ? "View your registered movies." : "Look for different movies to watch."' />
    <div class="ui basic labels">
        <a class="ui label">
            Total
            <div class="detail">{{store.movies.length}}</div>
        </a>
    </div>
    <div class="ui divider"></div>
    <form class="ui form" @submit.prevent="submit">
        <div class="field">
            <label for="movie_title">Title</label>
            <div class="ui left icon input">
                <input
                    v-model="movie.title"
                    type="text" name="movie[title]" id="movie_title" required>
                <i class="tag icon"></i>
            </div>
        </div>
        <div class="field">
            <label for="movie_description">Description</label>
            <div class="ui left icon input">
                <textarea
                    v-model="movie.description"
                    rows="5"
                    type="text" name="movie[description]" id="movie_description">
                </textarea>
                <i class="pen icon"></i>
            </div>
        </div>
        
        <div class="ui right aligned fitted basic segment">
            <button class="ui orange button" type="submit">Submit</button>
        </div>
    </form>

    <div class="ui divider"></div>

    <input type="hidden" id="selected">
    <table class="ui selectable celled mini table">
        <TableHeader
            :select-all="() => selector.selectAll()"
            :deselect-all="() => selector.deselectAll()"
            :invert-selection="() => selector.invertSelection()"
            :delete-selected="deleteSelected"
        >
            <th>
                <div class="ui fitted checkbox">
                    <input class="selector main" type="checkbox" data-main-selector-id="0"><label></label>
                </div>
            </th>
            <th>Title</th>
            <th>Description</th>
        </TableHeader>
        <tbody>
            <template v-if="store.movies.length > 0"> 
                <tr class="entries" v-for="mov, i in store.movies" :key="mov.id">
                    <td class="collapsing">
                        <div class="ui fitted checkbox">
                            <input class="selector" :value="mov.id" type="checkbox" data-selector-id="0"><label></label>
                        </div>
                    </td>
                    <td>
                        <h6 class="ui image header">
                            <img src="https://via.placeholder.com/50.png" class="ui mini rounded image">
                            <div class="content">
                                <a href="#">{{mov.title}}</a>
                            </div>
                        </h6>
                    </td>
                    <td>{{mov.description}}</td>
                </tr>
            </template>
            <tr v-else><td colspan="4">No entries.</td></tr>
        </tbody>
    </table>
</template>

<script>
import {reactive, ref} from "vue";
import Selector from "./../assets/selector.js";
const selector = reactive(new Selector("0"));

$(() => {
    selector.initialize();
});
</script>
