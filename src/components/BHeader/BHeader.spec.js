import { mount } from '@vue/test-utils';
import { describe, it, afterEach, expect } from 'vitest';
import { destroyWrapper } from 'fantom-vue3-components/src/test/utils.js';
import BHeader from '@/components/BHeader/BHeader.vue';

function createWrapper(options = {}) {
    return mount(BHeader, options);
}

let wrapper = null;

afterEach(() => {
    destroyWrapper(wrapper);
});

describe('BHeader', () => {
    it('should show logo', () => {
        wrapper = createWrapper();

        expect(wrapper.findByTestId('logo').exists()).toBe(true);
    });

    it('should show social media links', () => {
        wrapper = createWrapper();

        expect(wrapper.findComponent({ name: 'SocialMediaLinks' }).exists()).toBe(true);
    });
});
