import { mount } from '@vue/test-utils';
import { describe, afterEach, it } from 'vitest';
import TotalBurnedW from '@/components/TotalBurnedW/TotalBurnedW.vue';
import { destroyWrapper } from 'fantom-vue3-components/src/test/utils.js';
import IntegrationTestWrapper from '@/utils/IntegrationTestWrapper.vue';
import { getIntegrationTestWrapperMountOptions, setupTestServer } from '@/utils/test.js';
import { ftmBurnedTotalHandlers } from '@/mocks/handlers/ftmBurnedTotal/index.js';
import { expect } from 'vitest/dist/index.js';
import { formatTokenValue } from '@/utils/formatters.js';
import { priceHandlers } from '@/mocks/handlers/price/index.js';

const { waitForRequest } = setupTestServer([...ftmBurnedTotalHandlers, ...priceHandlers]);

function createWrapper(options = {}) {
    return mount(IntegrationTestWrapper, getIntegrationTestWrapperMountOptions({ TotalBurnedW }, options));
}

let wrapper = null;
const BURNED_TOTAL_OPERATION = 'GetFtmBurnedTotal';
const PRICE_OPERATION = 'GetPrice';

afterEach(() => {
    destroyWrapper(wrapper);
});

describe('TotalBurnedW', () => {
    it('should load and show total burned FTM', async () => {
        const pendingRequest = waitForRequest({ operationName: BURNED_TOTAL_OPERATION });

        wrapper = createWrapper();

        const { response } = await pendingRequest;
        const { ftmBurnedTotal } = JSON.parse(response.body).data;

        expect(ftmBurnedTotal).toMatch(/0x[\d\w]+/);
        expect(wrapper.findByTestId('total_burned').text()).toContain(formatTokenValue(ftmBurnedTotal));
    });

    it('should load FTM price and show total burned FTM in USD', async () => {
        const pendingRequest = waitForRequest({ operationName: PRICE_OPERATION });

        wrapper = createWrapper();

        const { response } = await pendingRequest;
        const { price } = JSON.parse(response.body).data.price;

        expect(price).toBeGreaterThan(0);
        expect(wrapper.findByTestId('total_burned_usd').text()).toMatch(/\$[\d,]+/);
    });

    it('should periodically refetch total burned FTM if `totalBurnedInterval` prop is non-zero integer', async () => {
        let pendingRequest = waitForRequest({ operationName: BURNED_TOTAL_OPERATION });

        wrapper = createWrapper({ props: { totalBurnedInterval: 20 } });
        expect(await pendingRequest).toHaveProperty('request');

        pendingRequest = waitForRequest({ operationName: BURNED_TOTAL_OPERATION });
        expect(await pendingRequest).toHaveProperty('request');
    });

    it('should periodically refetch FTM price if `ftmPriceInterval` prop is non-zero integer', async () => {
        let pendingRequest = waitForRequest({ operationName: PRICE_OPERATION });

        wrapper = createWrapper({ props: { ftmPriceInterval: 20 } });
        expect(await pendingRequest).toHaveProperty('request');

        pendingRequest = waitForRequest({ operationName: PRICE_OPERATION });
        expect(await pendingRequest).toHaveProperty('request');
    });
});
