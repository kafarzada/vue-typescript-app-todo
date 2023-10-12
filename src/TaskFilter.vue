<template>
    <label for="filterTask">Фильтр:
        <input type="text"
               name=""
               id="filterTask"
               :value='value'
                @input='inputVal'
               >
</label></template>

<script lang='ts' setup>
import {
    defineProps, defineEmits,
} from 'vue';

defineProps<{
    value: string
}>();

const emit = defineEmits(['update:value']);
function inputVal(event: Event) {
    emit('update:value', (event.target as HTMLInputElement).value);
}
</script>
