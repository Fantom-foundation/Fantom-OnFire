<script setup>
import BlockList from '@/components/BlockList/BlockList.vue';
import { useInterval } from 'fantom-vue3-components/src/composables/useInterval/useInterval.js';
import { getFtmLatestBlockBurnList } from '@/queries/getFtmLatestBlockBurnList.js';

const props = defineProps({
    /** Maximum amount of blocks to be loaded and displayed */
    maxBlocks: {
        type: Number,
        default: 10,
    },
    /** Refetch block list after this amount if time (in milliseconds) */
    interval: {
        type: Number,
        default: 0,
    },
});

// reactive variables
const { data: blocks, refetch: refetchBlocks } = getFtmLatestBlockBurnList(props.maxBlocks);

function startPolling(speed = 3000) {
    const { interval } = useInterval(true);

    interval.start(
        'block-list',
        () => {
            refetchBlocks();
        },
        speed
    );
}

if (props.interval > 0) {
    startPolling(props.interval);
}
</script>

<template>
    <div>
        <BlockList :blocks="blocks" :max-blocks="maxBlocks" />
    </div>
</template>

<style lang="scss"></style>
