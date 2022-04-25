import { mount } from '@vue/test-utils';
import { describe, it, afterEach, expect } from 'vitest';
import BlockListW from '@/components/BlockListW/BlockListW.vue';
import { setupTestServer } from '@/utils/test.js';
import { ftmLatestBlockBurnListHandlers } from '@/mocks/handlers/ftmLatestBlockBurnList/index.js';
import { toInt } from '@/utils/big-number.js';
import { destroyWrapper } from 'fantom-vue3-components/src/test/utils.js';
import IntegrationTestWrapper from '@/utils/IntegrationTestWrapper.vue';
import { getIntegrationTestWrapperMountOptions } from '@/utils/test.js';
import { formatTokenValue } from '@/utils/formatters.js';

const { waitForRequest } = setupTestServer(ftmLatestBlockBurnListHandlers);
const OPERATION_NAME = 'GetFtmLatestBlockBurnList';
let wrapper = null;

function createWrapper(options = {}) {
    return mount(IntegrationTestWrapper, getIntegrationTestWrapperMountOptions({ BlockListW }, options));
}

afterEach(() => {
    destroyWrapper(wrapper);
});

describe('BlockListW', () => {
    it('should render blocks', async () => {
        const pendingRequest = waitForRequest({ operationName: OPERATION_NAME });

        wrapper = createWrapper();

        const { response } = await pendingRequest;
        const data = JSON.parse(response.body).data.ftmLatestBlockBurnList;

        expect(wrapper.text()).toContain(toInt(data[0].blockNumber));
        expect(wrapper.text()).toContain(formatTokenValue(data[1].amount));
    });

    it('should load `maxBlocks` amount of blocks', async () => {
        const pendingRequest = waitForRequest({ operationName: OPERATION_NAME });

        wrapper = createWrapper({ props: { maxBlocks: 6 } });

        const { response } = await pendingRequest;
        const body = JSON.parse(response.body);

        expect(body.data.ftmLatestBlockBurnList).toHaveLength(6);
    });

    it('should show `maxBlocks` amount of blocks', async () => {
        const pendingRequest = waitForRequest({ operationName: OPERATION_NAME });

        wrapper = createWrapper({ props: { maxBlocks: 6 } });

        await pendingRequest;

        expect(wrapper.findByTestCode('block')).toHaveLength(6);
    });

    it('should periodically refetch block list if `interval` prop is non-zero integer', async () => {
        let pendingRequest = waitForRequest({ operationName: OPERATION_NAME });

        // vi.useFakeTimers();
        wrapper = createWrapper({ props: { maxBlocks: 6, interval: 20 } });
        // vi.useRealTimers();

        expect(await pendingRequest).toHaveProperty('request');

        pendingRequest = waitForRequest({ operationName: OPERATION_NAME });

        expect(await pendingRequest).toHaveProperty('request');
        //
    });
});
