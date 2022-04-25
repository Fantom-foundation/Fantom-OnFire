<script setup>
import TotalBurned from '@/components/TotalBurned/TotalBurned.vue';
import { getFtmBurnedTotal } from '@/queries/getFtmBurnedTotal.js';
import { getPrice } from '@/queries/getPrice.js';
import { useInterval } from 'fantom-vue3-components/src/composables/useInterval/useInterval.js';

const props = defineProps({
    totalBurnedInterval: {
        type: Number,
        default: 0,
    },
    ftmPriceInterval: {
        type: Number,
        default: 0,
    },
});

const { data: totalBurned, refetch: refetchTotalBurned } = getFtmBurnedTotal();
const { data: ftmPrice, refetch: refetchFTMPrice } = getPrice();
let interval = null;

if (props.totalBurnedInterval > 0 || props.ftmPriceInterval > 0) {
    interval = useInterval(true).interval;
}

if (props.totalBurnedInterval > 0 && interval) {
    interval.start(
        'total-burned',
        () => {
            refetchTotalBurned();
        },
        props.totalBurnedInterval
    );
}

if (props.ftmPriceInterval > 0 && interval) {
    interval.start(
        'ftm-price',
        () => {
            refetchFTMPrice();
        },
        props.ftmPriceInterval
    );
}
</script>

<template>
    <TotalBurned :total-burned="totalBurned" :ftm-price="ftmPrice" />
</template>
