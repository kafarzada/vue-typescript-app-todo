<template>
    <div class="mobile-nav-bar__buttons">
        <template v-if="!isAuthenticated">
            <SignupButton />
            <LoginButton />
        </template>
        <template v-if="isAuthenticated">
            <LogoutButton />
        </template>
    </div>
    <AppHeader />
    <router-view />
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import AppHeader from './components/AppHeader.vue';
// eslint-disable-next-line import/order
import LoginButton from './components/login-button.vue';
import LogoutButton from './components/logout-button.vue';
import SignupButton from './components/signup-button.vue';
// eslint-disable-next-line import/order
import { useAuth0 } from '@auth0/auth0-vue';

const { isAuthenticated } = useAuth0();
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
