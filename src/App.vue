<script setup>
import Home from '@/views/Home/Home.vue';
import { setupApolloProviders } from '@/plugins/apollo/apollo-providers.js';

setupApolloProviders();
</script>

<template>
    <Home />
</template>

<style lang="scss">
@use 'assets/scss/main';
</style>
