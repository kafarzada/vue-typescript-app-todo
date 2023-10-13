<template>
    <div>
        <h2>{{ user?.name }}</h2>
        <p>{{ user?.email }}</p>
    </div>
</template>

<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue';

const { user } = useAuth0();

const code = user ? JSON.stringify(user.value, null, 2) : '';
</script>
