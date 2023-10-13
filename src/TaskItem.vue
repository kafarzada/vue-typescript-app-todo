<template>
    <div
        class='task'
        :class="{cursorPointer: !task.completed}"
        :draggable='task.completed ? false : true'
        @dragstart="dragStart(task.id)"
        @dragenter.stop
        :key='task.id'>
        <p>{{ task.task }}</p>
        <span class='priority'
              :class=[task.priority]>{{ task.priority }}</span>
        <p class="date-text">Дата создание:
                {{ new Date(task.createdDate).toLocaleDateString() }}</p>
        <p v-if="task.compeletedDate !== undefined" class="date-text">Дата выполнения:
                {{ new Date(task.compeletedDate).toLocaleDateString() }}</p>
    </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';
import { ITask } from './types/types';

defineProps<{
    task: ITask
}>();

const emit = defineEmits({
    dragStart: null,
});

function dragStart(id: string) {
    emit('dragStart', id);
}
</script>
<style>
.task {
    width: 300px;
    margin: 15px auto;
    padding: 15px;
    border: none;
    min-height: 90px;
    margin-bottom: 15px;
    border-radius: 15px;
    background-color: white;
    user-select: none;
}

.cursorPointer {
    cursor: pointer;
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

.date-text {
    font-style: italic;
    color: rgb(174, 174, 174);
    font-size: 12px;
}

</style>
