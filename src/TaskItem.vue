<template>
    <li class='task'
        draggable='true'
        @dragstart="dragStart(task.id)"
        :key='task.id'>
        <p>{{ task.task }}</p>
        <span class='priority'
              :class=[task.priority]>{{ task.priority }}</span>
    </li>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';
import { ITask } from './types/types';

defineProps<{
    task: ITask
}>();

const emit = defineEmits({
    dragStrat: null,
})

function dragStart(id: string) {
    emit('dragStrat', id);
}
</script>
<style>
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
