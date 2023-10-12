<template>
    <ul class='task-list'>
        <TaskFilter v-model:value='filterValue' />
        <TaskItem v-for='task in tasks'
                  :key='task.id'
                  :task='task' />
    </ul>
</template>

<script lang='ts' setup>
import { defineProps, ref } from 'vue';
import type { Ref } from 'vue';
import { ITask } from './types/types';
import TaskItem from './TaskItem.vue';
import TaskFilter from './TaskFilter.vue'

const filterValue: Ref<string> = ref('');

defineProps<{
    tasks: ITask[]
}>();

</script>

<style>
.task-list {
    list-style: none;
}
</style>
