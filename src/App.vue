<template>
    <div class='todo'>
        <div>
            <h3>Новые Задачи:</h3>
            <TaskList :tasks='holdTasks'/>
        </div>
        <div>
            <h3>Выполняются:</h3>
            <TaskList :tasks='tasksInProcess' />
        </div>
        <div>
            <h3>Выполнены:</h3>
            <TaskList :tasks='completedTasks' />
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import type { Ref } from 'vue';
import storage from './api/client';
import { ITask } from './types/types';
import TaskList from './TaskList.vue';

const tasks: Ref<Array<ITask>> = ref([]);

onMounted(() => {
    tasks.value = storage.getAllTasks();
});

const holdTasks = computed(() => tasks.value.filter((task) => task.status === 'On Hold'));
const tasksInProcess = computed(() => tasks.value.filter((task) => task.status === 'In Progress'));
const completedTasks = computed(() => tasks.value.filter((task) => task.status === 'Completed'));

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
