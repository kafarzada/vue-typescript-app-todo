<template>
    <div class="nav-bar__buttons">
        <template v-if="!isAuthenticated">
            <SignupButton />
            <LoginButton />
        </template>
        <template v-if="isAuthenticated">
            <LogoutButton />
        </template>
    </div>
</template>

<script setup lang="ts">

</script>
