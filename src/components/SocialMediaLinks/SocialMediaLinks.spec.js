import { mount } from '@vue/test-utils';
import { describe, it, afterEach, expect } from 'vitest';
import { destroyWrapper } from 'fantom-vue3-components/src/test/utils.js';
import SocialMediaLinks from '@/components/SocialMediaLinks/SocialMediaLinks.vue';

function createWrapper(options = {}) {
    return mount(SocialMediaLinks, options);
}

let wrapper = null;

afterEach(() => {
    destroyWrapper(wrapper);
});

describe('SocialMediaLinks', () => {
    it('should match snapshot', () => {
        wrapper = createWrapper();

        expect(wrapper.element).toMatchSnapshot();
    });
});
