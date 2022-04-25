import { mount } from '@vue/test-utils';
import { describe, it, afterEach, expect } from 'vitest';
import Home from '@/views/Home/Home.vue';
import { destroyWrapper } from 'fantom-vue3-components/src/test/utils.js';
import IntegrationTestWrapper from '@/utils/IntegrationTestWrapper.vue';
import { getIntegrationTestWrapperMountOptions } from '@/utils/test.js';

function createWrapper(options = {}) {
    return mount(IntegrationTestWrapper, getIntegrationTestWrapperMountOptions({ Home }, options));
}

let wrapper = null;

afterEach(() => {
    destroyWrapper(wrapper);
});

describe('Home page', () => {
    it('should show total fees', async () => {
        wrapper = createWrapper();

        expect(wrapper.findComponent({ name: 'TotalBurnedW' }).exists()).toBe(true);
    });

    it('should show info text', () => {
        wrapper = createWrapper();

        expect(wrapper.findComponent({ name: 'InfoText' }).exists()).toBe(true);
    });

    it('should show block list', () => {
        wrapper = createWrapper();

        expect(wrapper.findComponent({ name: 'BlockListW' }).exists()).toBe(true);
    });
});
