<template>
    <div class='task-list'
        :class="{borderIsActive : borderstyle}"
        @dragover.prevent
        @drop='dropHandler'
        @dragenter='dragEnterHandler'
        @dragleave='dragLeaveHandler'>
        <slot name="title"></slot>
        <slot></slot>
</div>
</template>

<script lang='ts' setup>
import {
    ref,
    defineEmits,
    defineProps,
} from 'vue';
import type { Ref } from 'vue';

const props = defineProps<{
    listStatus: string
}>()
const borderstyle: Ref<boolean> = ref(false);
const emit = defineEmits({
    dropHandler: null,
})
function dropHandler(): void {
    emit('dropHandler', props.listStatus);
    borderstyle.value = false;
}

function dragEnterHandler(): void {
    borderstyle.value = true;
}

function dragLeaveHandler(): void {
    borderstyle.value = false;
}

</script>

<style>
.task-list {
    list-style: none;
    padding: 15px;
    border: 1px solid transparent;
    flex-basis: 33%;
    padding-bottom: 200px;
    background-color: rgba(0, 0, 0, 0.047);
    margin: 20px;
    border-radius: 15px;
}

.borderIsActive {
    border: 1px dotted rgba(0, 0, 0, 0.432);
    background-color: rgba(99, 234, 255, 0.066);
}
</style>
