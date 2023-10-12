<template>
    <ul class='task-list'
        :class='{ borderIsActive: borderstyle }'
        @dragover.prevent
        @drop='dropHandler'
        @dragenter='dragEnterHandler'
        ,
        @dragexit='dragExitHandler'>
        <TaskFilter v-model:value='filterValue' />
        <TaskItem v-for='task in list'
                  :key='task.id'
                  :task='task' />
    </ul>
</template>

<script lang='ts' setup>
import {
    defineProps, onMounted,
    ref, watch,
} from 'vue';
import type { Ref } from 'vue';
import { ITask } from './types/types';
import TaskItem from './TaskItem.vue';
import TaskFilter from './TaskFilter.vue';

const filterValue: Ref<string> = ref('');

const props = defineProps<{
    tasks: ITask[]
}>();

const list: Ref<ITask[]> = ref([]);
const borderstyle: Ref<boolean> = ref(false);

onMounted(() => {
    list.value = props.tasks;
});

watch(filterValue, (newVal) => {
    if (newVal === '') {
        list.value = props.tasks;
    } else {
        list.value = props.tasks.filter((task) => task.task.startsWith(newVal));
    }
});

function dropHandler(): void {
    alert('drop');
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
