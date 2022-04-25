import { mount } from '@vue/test-utils';
import { describe, it, vi, beforeEach, afterEach, expect } from 'vitest';
import BlockList from '@/components/BlockList/BlockList.vue';
import { toInt } from '@/utils/big-number.js';
import { delay } from 'fantom-vue3-components';
import {
    ftmLatestBlockBurnListData,
    ftmLatestBlockBurnListData2,
} from '@/mocks/handlers/ftmLatestBlockBurnList/index.js';
import { formatTokenValue } from '@/utils/formatters.js';

const blocksSample = ftmLatestBlockBurnListData().ftmLatestBlockBurnList.slice(0, 3);
const newBlocksSample = ftmLatestBlockBurnListData2().ftmLatestBlockBurnList.slice(0, 3);

function createWrapper(options = { props: { blocks: blocksSample } }) {
    return mount(BlockList, options);
}

const ANIMATE_CLASS = 'blocklist_block-animate';
let wrapper = null;

beforeEach(() => {
    // vi.useFakeTimers();
});

afterEach(() => {
    // vi.useRealTimers();
    wrapper = null;
});

describe('BlockList', () => {
    it('should show list of blocks', () => {
        vi.setSystemTime(new Date(toInt(blocksSample[0].timestamp) * 1000 + 2000));

        wrapper = createWrapper();

        expect(wrapper.text()).toContain(toInt(blocksSample[0].blockNumber));
        expect(wrapper.text()).toContain('2 seconds ago');
        // expect(wrapper.text()).toContain(bFromWei(blocksSample[1].amount).toNumber());
        expect(wrapper.text()).toContain(formatTokenValue(blocksSample[1].amount));

        vi.restoreAllMocks();
    });

    it('should show loading indicator if no blocks are given', async () => {
        wrapper = createWrapper({
            props: {
                blocks: [],
            },
        });

        expect(wrapper.findByTestId('loading_indicator').exists()).toBe(true);

        await wrapper.setProps({ blocks: blocksSample });

        expect(wrapper.findByTestId('loading_indicator').exists()).toBe(false);
    });

    it('should prepend new blocks', async () => {
        wrapper = createWrapper();

        await wrapper.setProps({ blocks: newBlocksSample });

        expect(wrapper.text()).toMatch(
            new RegExp(`.*${toInt(newBlocksSample[0].blockNumber)}.*${toInt(blocksSample[0].blockNumber)}.*`)
        );
    });

    it('should display maximum of `maxBlocks` amount of blocks', () => {
        wrapper = createWrapper({
            props: {
                blocks: [...newBlocksSample, ...blocksSample],
                maxBlocks: 4,
            },
        });

        expect(wrapper.findByTestCode('block')).toHaveLength(4);
    });

    it('should animate newly added blocks', async () => {
        wrapper = createWrapper();

        await delay(30);

        const blocks = wrapper.findByTestCode('block');

        expect(blocks[0].attributes('class')).toContain(ANIMATE_CLASS);

        await wrapper.setProps({ blocks: newBlocksSample });

        expect(blocks[0].attributes('class')).toContain(ANIMATE_CLASS);
    });

    it.skip('should match snapshot', () => {
        wrapper = createWrapper();

        expect(wrapper.element).toMatchSnapshot();
    });
});
