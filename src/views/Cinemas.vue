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

const cinema = reactive({
    name: "",
    location: "",
    get seats() {
        return this._seats ?? 1;
    },
    set seats(val) {
        this._seats = Math.max(1, val);
    } 
});

function submit() {
    store.createCinema(cinema, (r) => {
        store.$state._cinemas.refetch();
        store.setMessages(...r.data.createCinema.messages);
    });
}

function deleteSelected() {
    const selected = selector.selectedValues;
    if(selected.length == 0 ||
        !confirm(`Are you sure you want to delete the ${selected.length} selected record(s)?`))
        return;
    
    // $(selector.selected).each((e) => selector.deselect(e));
    const ph = selected.map((e) => "?").join(", ");
    store.destroyCinema({
        condition: `id in (${ph})`,
        values: selected
    }, (r) => {
        store.$state._cinemas.refetch();
        store.setMessages(...r.data.destroyCinema.messages);
    })
}
</script>

<template>
    <PageHeader title="Cinemas" :subtitle='store.signedIn?.admin ? "View your registered cinemas." : "Look for diffent cinemas to watch a movie."' />
    <div class="ui basic labels">
        <a class="ui label">
            Total
            <div class="detail">{{store.cinemas.length}}</div>
        </a>
    </div>
    <div class="ui divider"></div>
    <form class="ui form" @submit.prevent="submit">
        <div class="field">
            <label for="cinema_name">Name</label>
            <div class="ui left icon input">
                <input
                    v-model="cinema.name"
                    type="text" name="cinema[name]" id="cinema_name" required>
                <i class="tag icon"></i>
            </div>
        </div>
        <div class="two fields">
            <div class="field">
                <label for="cinema_location">Location</label>
                <div class="ui left icon input">
                    <input
                        v-model="cinema.location"
                        type="text" name="cinema[location]" id="cinema_location" required>
                    <i class="marker icon"></i>
                </div>
            </div>
            <div class="field">
                <label for="cinema_seats">Seats</label>
                <div class="ui left icon input">
                    <input
                        v-model="cinema.seats"
                        type="number" name="cinema[seats]" id="cinema_seats" required>
                    <i class="chair icon"></i>
                </div>
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
            <th>Name</th>
            <th>Location</th>
            <th>Seats</th>
        </TableHeader>
        <tbody>
            <template v-if="store.cinemas.length > 0"> 
                <tr class="entries" v-for="cin, i in store.cinemas" :key="cin.id">
                    <td class="collapsing">
                        <div class="ui fitted checkbox">
                            <input class="selector" :value="cin.id" type="checkbox" data-selector-id="0"><label></label>
                        </div>
                    </td>
                    <td>
                        <h6 class="ui image header">
                            <img src="https://via.placeholder.com/50.png" class="ui mini rounded image">
                            <div class="content">
                                <a href="#">{{cin.name}}</a>
                            </div>
                        </h6>
                    </td>
                    <td>{{cin.location}}</td>
                    <td>{{cin.seats}}</td>
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
