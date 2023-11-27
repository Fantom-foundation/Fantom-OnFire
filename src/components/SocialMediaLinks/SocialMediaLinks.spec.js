import { describe, it, afterEach, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { destroyWrapper } from 'fantom-vue3-components/src/test/utils.js';
import SocialMediaLinks from './SocialMediaLinks.vue';

let wrapper = null;

function createWrapper(options = {}) {
    return mount(SocialMediaLinks, options);
}

afterEach(() => {
    destroyWrapper(wrapper);
});

describe('SocialMediaLinks', () => {
    it('should match snapshot', async () => {
        wrapper = createWrapper();

        expect(wrapper.element).toMatchSnapshot();
    });
});
