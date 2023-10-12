<template>
    <label :for="id">Фильтр:
        <input type="text"
               name="filter"
               :id="id"
               :value='value'
                @input='inputVal'
               >
</label></template>

<script lang='ts' setup>
import {
    defineProps, defineEmits,
} from 'vue';

defineProps<{
    value: string,
    id: string,
}>();

const emit = defineEmits(['update:value']);
function inputVal(event: Event) {
    console.log('sd');
    emit('update:value', (event.target as HTMLInputElement).value);
}
</script>
