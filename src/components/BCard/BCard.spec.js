import { mount } from '@vue/test-utils';
import { describe, it, afterEach, expect } from 'vitest';
import Card from '@/components/BCard/BCard.vue';
import { destroyWrapper } from 'fantom-vue3-components/src/test/utils.js';

function createWrapper(options = {}) {
    return mount(Card, options);
}

let wrapper = null;

afterEach(() => {
    destroyWrapper(wrapper);
});

describe('Card', () => {
    it('should render content in default slot', () => {
        wrapper = createWrapper({
            slots: {
                default: ['<span>content</span>'],
            },
        });

        expect(wrapper.html()).toContain('<span>content</span>');
    });

    it('should match snapshot', () => {
        wrapper = createWrapper();

        expect(wrapper.element).toMatchSnapshot();
    });
});
