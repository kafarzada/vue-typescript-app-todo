<template>
    <div>
        <label for="new-task">Новая Задача
            <input type="text" name="new-task" id="new-task" v-model="newTaskvalue">
        </label>
        <label for="select-priority">
            <select name="priority" id="select-priority" v-model="priorityOfNewTask">
                <option value=''></option>
                <option value="Low">Low</option>
                <option value='Medium'>Medium</option>
                <option value='High'>High</option>
            </select>
        </label>
        <button @click="addNewTask">Новая Задача</button>
    </div>
    <TaskFilter v-model:value="filterValue" id="filter" />
    <div class='todo'>
        <TaskList
            @drop-handler="drapHadler"
            listStatus="On Hold"
        >
            <template #title><h3 class="title">Новые Задачи:</h3></template>
            <TaskItem
            v-for='task in onHoldList'
            :key='task.id'
            :task='task'
            @drag-start="dragStart"/>
        </TaskList>
        <TaskList
            @drop-handler="drapHadler"
            listStatus="In Progress">
            <template #title><h3 class="title">Выполняются:</h3></template>
            <TaskItem
            v-for='task in progressList'
            :key='task.id'
            :task='task'
            @drag-start="dragStart"
            />
        </TaskList>
        <TaskList
            @drop-handler="drapHadler"
            listStatus="Completed">
            <template #title><h3 class="title">Выполнены</h3></template>
            <TaskItem
                v-for='task in completedTask'
                :key='task.id'
                :task='task'
                @drag-start="dragStart"/>
        </TaskList>
    </div>
</template>

<script setup lang="ts">
import {
    onMounted, ref, watch, computed,
} from 'vue';
import type { Ref } from 'vue';
import storage from './api/client';
import { ITask, Status, Priority } from './types/types';
import TaskList from './TaskList.vue';
import TaskFilter from './TaskFilter.vue';
import TaskItem from './TaskItem.vue';

const tasks: Ref<ITask[][]> = ref([]);
const OnHoldTasks: Ref<ITask[]> = ref([]);
const InProgressTasks: Ref<ITask[]> = ref([]);
const CompletedTasks: Ref<ITask[]> = ref([]);
const dragTaskId: Ref<string> = ref('');

const filterValue: Ref<string> = ref('');
const newTaskvalue: Ref<string> = ref('');
const priorityOfNewTask: Ref<Priority> = ref('Low');

onMounted(() => {
    tasks.value = storage.getAllTasks();
    [CompletedTasks.value, InProgressTasks.value, OnHoldTasks.value] = tasks.value;
});

const onHoldList = computed(() => OnHoldTasks.value);
const progressList = computed(() => InProgressTasks.value);
const completedTask = computed(() => CompletedTasks.value);

watch(tasks, () => {
    [CompletedTasks.value, InProgressTasks.value, OnHoldTasks.value] = tasks.value;
});

watch(filterValue, () => {
    if (!filterValue.value) {
        [CompletedTasks.value, InProgressTasks.value, OnHoldTasks.value] = tasks.value;
    }
    OnHoldTasks.value = tasks
        .value[2]?.filter((task) => task.task.toLowerCase().includes(filterValue.value));
    InProgressTasks.value = tasks
        .value[1]?.filter((task) => task.task.toLowerCase().includes(filterValue.value));
    CompletedTasks.value = tasks
        .value[3]?.filter((task) => task.task.toLowerCase().includes(filterValue.value));
});

function addNewTask() {
    const newTask = storage.createNewTask({
        task: newTaskvalue.value,
        priority: priorityOfNewTask.value,
    });

    if (newTask) {
        tasks.value[2].push(newTask);
        tasks.value = [...tasks.value];
    }
}

function dragStart(id: string) {
    dragTaskId.value = id;
}

function drapHadler(listStatus: Status) {
    tasks.value = storage.forwardTask(dragTaskId.value, listStatus);
}
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

.title {
    text-align: center;
}
</style>
