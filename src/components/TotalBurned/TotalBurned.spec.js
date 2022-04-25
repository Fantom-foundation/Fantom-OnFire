import { mount } from '@vue/test-utils';
import { describe, it, afterEach, expect } from 'vitest';
import TotalBurned from '@/components/TotalBurned/TotalBurned.vue';
import { destroyWrapper } from 'fantom-vue3-components/src/test/utils.js';
import { ftmBurnedTotalData } from '@/mocks/handlers/ftmBurnedTotal/index.js';
import { formatTokenValue } from '@/utils/formatters.js';

function createWrapper(options = {}) {
    return mount(TotalBurned, options);
}

const TOTAL_BURNED = ftmBurnedTotalData().ftmBurnedTotal;
let wrapper = null;

afterEach(() => {
    destroyWrapper(wrapper);
});

describe('TotalBurned', () => {
    it('should show total burned FTM', () => {
        wrapper = createWrapper({
            props: {
                totalBurned: TOTAL_BURNED,
            },
        });

        expect(wrapper.findByTestId('total_burned').text()).toContain(formatTokenValue(TOTAL_BURNED));
    });

    it('should show total burned FTM in USD', () => {
        wrapper = createWrapper({
            props: {
                totalBurned: TOTAL_BURNED,
                ftmPrice: 1.8,
            },
        });

        expect(wrapper.findByTestId('total_burned_usd').text()).toMatch(/\$[\d,]+/);
    });

    it('should match snapshot', () => {
        wrapper = createWrapper();

        expect(wrapper.element).toMatchSnapshot();
    });
});
