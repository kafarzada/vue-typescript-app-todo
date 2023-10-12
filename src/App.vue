<template>
    <TaskFilter v-model:value="filterValue" />
    <div class='todo'>
        <div>
            <h3>Новые Задачи:</h3>
            <TaskList :tasks='OnHoldTasks' />
        </div>
        <div>
            <h3>Выполняются:</h3>
            <TaskList :tasks='InProgressTasks' />
        </div>
        <div>
            <h3>Выполнены:</h3>
            <TaskList :tasks='CompletedYasks' />
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    onMounted, ref, watch,
} from 'vue';
import type { Ref } from 'vue';
import storage from './api/client';
import { ITask } from './types/types';
import TaskList from './TaskList.vue';
import TaskFilter from './TaskFilter.vue';

const tasks: Ref<ITask[]> = ref([]);
const OnHoldTasks: Ref<ITask[]> = ref([]);
const InProgressTasks: Ref<ITask[]> = ref([]);
const CompletedYasks: Ref<ITask[]> = ref([]);

const filterValue: Ref<string> = ref('');

onMounted(() => {
    tasks.value = storage.getAllTasks();
    OnHoldTasks.value = tasks.value.filter((task) => task.status === 'On Hold');
    InProgressTasks.value = tasks.value.filter((task) => task.status === 'In Progress');
    CompletedYasks.value = tasks.value.filter((task) => task.status === 'Completed');
});

watch(filterValue, (newVal) => {
    OnHoldTasks.value = tasks.value.filter((task) => task.task.toLowerCase()
        .includes(newVal.toLowerCase()) && task.status === 'On Hold');
    InProgressTasks.value = tasks.value.filter((task) => task.task.toLowerCase()
        .includes(newVal.toLowerCase()) && task.status === 'In Progress');
    CompletedYasks.value = tasks.value.filter((task) => task.task.toLowerCase()
        .includes(newVal.toLowerCase()) && task.status === 'Completed');
})
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.todo {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 20px;
}

.task-list {
    list-style: none;
}

.task {
    width: 300px;
    border: 1px solid rgb(146, 146, 146);
    padding: 15px;
    min-height: 90px;
    margin-bottom: 15px;
    cursor: pointer;
    border-radius: 10px;
}

.priority {
    display: inline-block;
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 10px 15px;
    border: none;
    border-radius: 20px;
}

.Medium {
    background-color: yellowgreen;
    color: white;
}

.Low {
    background-color: yellow;
}

.High {
    background-color: red;
    color: white;
}
</style>
