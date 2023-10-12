<template>
    <ul class='task-list'
        @dragover.prevent
        @drop='dropHandler'
        @dragenter='dragEnterHandler'
        @dragexit='dragExitHandler'>
        <TaskItem v-for='task in props.tasks'
                  :key='task.id'
                  :task='task' />
    </ul>
</template>

<script lang='ts' setup>
import {
    defineProps, ref, defineEmits,
} from 'vue';
import type { Ref } from 'vue';
import { ITask } from './types/types';
import TaskItem from './TaskItem.vue';

const props = defineProps<{
    tasks: ITask[]
}>();
const borderstyle: Ref<boolean> = ref(false);

const emit = defineEmits({
    filterValue: null,
});

function dropHandler(): void {
    // alert('drop');
}

function dragEnterHandler(): void {
    borderstyle.value = true;
}

function dragExitHandler(): void {
    borderstyle.value = false;
}

</script>

<style>
.task-list {
    list-style: none;
}

.borderIsActive {
    border: 1px dotted rgba(0, 0, 0, 0.432);
}
</style>
