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
    if(!store.signedIn?.admin) store.router.push({name: "root"});
});

function submit() {
    store.createTimeslot(timeslot, (r) => {
        store.$state._timeslots.refetch();
        store.setMessages(...r.data.createTimeslot.messages);
    });
}

function deleteSelected() {
    const selected = selector.selectedValues;
    if(selected.length == 0 ||
        !confirm(`Are you sure you want to delete the ${selected.length} selected record(s)?`))
        return;
    
    // $(selector.selected).each((e) => selector.deselect(e));
    const ph = selected.map((e) => "?").join(", ");
    store.destroyTimeslot({
        condition: `id in (${ph})`,
        values: selected
    }, (r) => {
        store.$state._timeslots.refetch();
        store.setMessages(...r.data.destroyTimeslot.messages);
    })
}

function test(e) {
    console.log(e.target.value);
}
</script>

<template v-if="store.signedIn.admin">
    <PageHeader title="Timeslots" subtitle='View your registered timeslots.' />
    <div class="ui basic labels">
        <a class="ui label">
            Total
            <div class="detail">{{store.timeslots.length}}</div>
        </a>
    </div>
    <div class="ui divider"></div>
    <form class="ui form" @submit.prevent="submit">
        <input type="hidden"
            v-model="timeslot.time"
            name="timeslot[time]" required>
        <div class="field">
            <label for="timeslot_time_">Time</label>
            <div class="ui calendar time">
                <div class="ui left icon input">
                    <input
                        type="text" id="timeslot_time_" required>
                    <i class="time icon"></i>
                </div>
            </div>
        </div>
        <div class="field">
            <label for="timeslot_label">Label</label>
            <div class="ui left icon input">
                <input
                    v-model="timeslot.label"
                    type="text" name="timeslot[label]" id="timeslot_label">
                <i class="tag icon"></i>
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
            <th>Time</th>
            <th>Label</th>
        </TableHeader>
        <tbody>
            <template v-if="store.timeslots.length > 0"> 
                <tr class="entries" v-for="tim, i in store.timeslots" :key="tim.id">
                    <td class="collapsing">
                        <div class="ui fitted checkbox">
                            <input class="selector" :value="tim.id" type="checkbox" data-selector-id="0"><label></label>
                        </div>
                    </td>
                    <td>
                        <h6 class="ui image header">
                            <img src="https://via.placeholder.com/50.png" class="ui mini rounded image">
                            <div class="content">
                                <a href="#">{{tim.time}}</a>
                            </div>
                        </h6>
                    </td>
                    <td>{{tim.label}}</td>
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

const timeslot = reactive({
    time: "",
    label: "",
});

$(() => {
    selector.initialize();
    
    $('.ui.calendar.time').calendar({
        type: 'time',
        disableMinute: true,
        onChange() {
            const date = $(this).calendar("get date");
            timeslot.time = date?.toISOString() ?? ""; 
            console.log(date);
        }
    });
});
</script>
