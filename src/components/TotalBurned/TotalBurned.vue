<script setup>
import { computed } from 'vue';
import { formatNumberByLocale, formatTokenValue } from '@/utils/formatters.js';
import { bFromWei } from '@/utils/big-number.js';
import BCard from '@/components/BCard/BCard.vue';

// props
const props = defineProps({
    /** FTM amount, 18 decimals, hex number. */
    totalBurned: {
        type: String,
        default: '0x0',
    },
    ftmPrice: {
        type: Number,
        default: 0,
    },
});

// computed properties
const cTotalBurned = computed(() => formatTokenValue(props.totalBurned));
const cTotalBurnedUSD = computed(() => {
    return formatNumberByLocale(bFromWei(props.totalBurned).multipliedBy(props.ftmPrice).toNumber(), 0, 'USD');
});
</script>

<template>
    <BCard class="totalburned">
        <h1 class="totalburned_title">Total FTM Burned</h1>
        <p class="totalburned_amount" data-testid="total_burned" style="background-image: url('./fire2.gif')">
            <span class="number">{{ cTotalBurned }}</span> <span class="totalburned_amount_currency">FTM</span>
        </p>
        <p class="totalburned_amount_usd number" data-testid="total_burned_usd">{{ cTotalBurnedUSD }}</p>
    </BCard>
</template>

<style lang="scss">
@use '~fantom-vue3-components/src/assets/scss/tools/media';
@use '~fantom-vue3-components/src/assets/scss/settings/breakpoints';

.totalburned {
    --totalburned-font-size: 32px;

    text-align: center;
    //margin-top: var(--f-spacer-4);
    padding: var(--f-spacer-5) var(--f-spacer-7) var(--f-spacer-7) var(--f-spacer-7);

    h1 {
        font-size: var(--totalburned-font-size);
        margin: 0;
    }

    &_amount {
        font-weight: 700;
        font-size: 108px;
        padding: var(--f-spacer-8) 0 var(--f-spacer-7) 0;
        //background: var(--f-doc-color) url('/fire.gif');
        background-color: var(--f-doc-color);
        background-position-y: 30%;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;

        &_currency {
            display: none;
            font-weight: normal;
            font-size: 0.5em;
        }

        &_usd {
            font-size: var(--totalburned-font-size);
        }
    }
}

@include media.media-max(breakpoints.$breakpoint-md) {
    .totalburned {
        --totalburned-font-size: var(--f-font-size-7);

        &_amount {
            font-size: var(--f-font-size-9);
            padding: var(--f-spacer-7) 0 var(--f-spacer-5) 0;
        }
    }
}

@include media.media-max(breakpoints.$breakpoint-sm) {
    .totalburned {
        --totalburned-font-size: var(--f-font-size-7);

        padding: var(--f-spacer-5) var(--f-spacer-4);

        &_amount {
            font-size: 42px;
            margin-bottom: 0;
            padding: var(--f-spacer-6) 0 var(--f-spacer-5) 0;
        }
    }
}
</style>
