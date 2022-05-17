<script setup>
import {reactive, ref} from "vue";
import useStore from "./../stores/store.js";

const store = useStore();

const props = defineProps({
    messages: {type: Array, default: () => []}
});

</script>

<template v-if="messages && messages.length != 0">
    <div
        v-for="message, mi in messages"
        :id="`message-${mi}`"
        :key="mi"
        :class="['ui', 'message', message.type]" style="display: block;">
        <i class="close icon"
            @click="(ev, i=mi) => messages.splice(i, 1)"></i>
        <div class="header">
            {{message.title}}
        </div>
        <ul v-if="message.subtitles && message.subtitles.length >= 2">
            <li
                v-for="subtitle, si in message.subtitles"
                :key="si"
                class="subtitle">{{subtitle}}</li>
        </ul>
        <p v-else-if="message.subtitles && message.subtitles.length == 1"
            class="subtitle">{{message.subtitles[0]}}</p>
    </div>
</template>

<style scoped>
</style>