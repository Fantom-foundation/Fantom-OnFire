<script setup>
import { ref, watch } from 'vue';
import { toInt } from '@/utils/big-number.js';
import dayjs from '@/plugins/dayjs/dayjs.js';
import { defer } from 'fantom-vue3-components/src/utils/index.js';
import FDotsLoader from 'fantom-vue3-components/src/components/FDotsLoader/FDotsLoader.vue';
import { formatTokenValue } from '@/utils/formatters.js';
import BCard from '@/components/BCard/BCard.vue';
import AppIconset from '@/components/AppIconset.vue';

// props
const props = defineProps({
    /** Blocks to be displayed */
    blocks: {
        type: Array,
        default() {
            return [];
        },
    },
    /** Maximum amount of displayed blocks */
    maxBlocks: {
        type: Number,
        default: 20,
    },
});

// reactive variables
let dBlocks = ref([]);

// watchers
watch(
    () => props.blocks,
    (data) => {
        setBlocks(data);
    },
    { immediate: true }
);

/**
 * Set `dBlocks` variable
 *
 * @param {Array} newBlocks
 */
function setBlocks(newBlocks) {
    let blocks;
    let newBlocksLen = newBlocks.length;

    if (newBlocksLen > 0) {
        blocks = [...newBlocks, ...dBlocks.value];

        if (blocks.length > props.maxBlocks) {
            blocks = blocks.slice(0, props.maxBlocks);
        }

        dBlocks.value = blocks;

        animateBlocks(newBlocksLen, dBlocks.value);
    }
}

/**
 * Add `__animate__` attribute to the first `numBlocks` blocks
 *
 * @param {number} numBlocks Number of blocks to animate
 * @param {Array} blocks
 */
function animateBlocks(numBlocks, blocks) {
    defer(() => {
        const blocksLen = blocks.length;

        if (numBlocks > blocksLen) {
            numBlocks = blocksLen;
        }

        for (let i = 0; i < numBlocks; i++) {
            // blocks[i].__animate__ = true;
            blocks[i] = { ...blocks[i], __animate__: true };
        }
    }, 30);
}

function timeAgo(time) {
    return dayjs(time).fromNow();
}

function fromFTM(amount) {
    return formatTokenValue(amount, 18, 6);
}
</script>

<template>
    <div class="blocklist">
        <h2 class="blocklist_title not-visible">Blocks</h2>
        <template v-if="dBlocks.length > 0">
            <ul>
                <li v-for="block in dBlocks" :key="block.blockNumber">
                    <BCard
                        class="blocklist_block"
                        :class="{ 'blocklist_block-animate': block.__animate__ }"
                        data-testcode="block"
                    >
                        <div class="blocklist_block_burned number">
                            <AppIconset icon="fire" color="#ff711f" /> <span>{{ fromFTM(block.amount) }}</span>
                        </div>
                        <div class="blocklist_block_info">
                            Block <span class="number">{{ toInt(block.blockNumber) }}</span> <br />
                            {{ timeAgo(toInt(block.timestamp) * 1000) }}
                        </div>
                    </BCard>
                </li>
            </ul>
        </template>
        <template v-else>
            <div class="blocklist_loadingindicator" data-testid="loading_indicator">
                <FDotsLoader />
            </div>
        </template>
    </div>
</template>

<style lang="scss">
.blocklist {
    --blocklist-transition-length: 610ms;

    //color: var(--f-doc-color);

    /*&_title {
        margin: var(--f-spacer-5) 0 var(--f-spacer-3) 0;
    }*/

    ul {
        display: flex;
        flex-direction: column;
        gap: var(--f-spacer-1);
        list-style-type: none;
        margin: 0;
        padding: 0;
    }

    &_block {
        display: flex;
        align-items: center;
        opacity: 0;
        padding: var(--f-spacer-2) var(--f-spacer-3);
        //background: var(--f-color-grey-1);
        //border-radius: var(--f-border-radius-2);
        transition: opacity var(--blocklist-transition-length) ease, transform var(--blocklist-transition-length) ease;
        box-shadow: 0 2px 4px 0 rgba(48, 49, 51, 0.1), 0 0 1px 0 rgba(48, 49, 51, 0.05);

        &-animate {
            opacity: 1;
        }

        > * {
            flex: 1;
        }

        &_burned {
            display: flex;
            justify-items: center;
            font-size: var(--f-font-size-6);

            .fsvgicon {
                margin-right: var(--f-spacer-1);
            }
        }

        &_info {
            font-size: var(--f-font-size-4);
            text-align: end;
            line-height: 1.15;
        }
    }

    &_loadingindicator {
        text-align: center;
    }
}
</style>
