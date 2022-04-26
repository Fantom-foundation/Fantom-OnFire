<script setup>
import InfoText from '@/components/InfoText/InfoText.vue';
import BlockListW from '@/components/BlockListW/BlockListW.vue';
import TotalBurnedW from '@/components/TotalBurnedW/TotalBurnedW.vue';
import BHeader from '@/components/BHeader/BHeader.vue';
</script>

<template>
    <BHeader />
    <main class="home">
        <TotalBurnedW :total-burned-interval="3000" :ftm-price-interval="30000" />
        <InfoText />
        <BlockListW :interval="3000" />
    </main>
</template>

<style lang="scss">
@use '~fantom-vue3-components/src/assets/scss/tools/media';
@use '~fantom-vue3-components/src/assets/scss/settings/breakpoints';

.home {
    display: flex;
    flex-direction: column;
    gap: var(--f-spacer-2);
    width: 100%;
    max-width: 940px;
    margin: 0 auto;
    padding: var(--f-spacer-7) var(--f-spacer-4);
}

@include media.media-max(breakpoints.$breakpoint-md) {
    .home {
        padding: var(--f-spacer-4);
    }
}
</style>
