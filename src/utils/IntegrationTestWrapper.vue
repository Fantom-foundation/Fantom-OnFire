<script setup>
import { setupApolloProviders } from '@/plugins/apollo/apollo-providers.js';

setupApolloProviders();

defineProps(['component']);
</script>

<template>
    <component :is="component" />
</template>
