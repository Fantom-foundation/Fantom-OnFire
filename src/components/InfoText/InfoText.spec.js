import { mount } from '@vue/test-utils';
import { describe, it, afterEach, expect } from 'vitest';
import InfoText from '@/components/InfoText/InfoText.vue';
import { destroyWrapper } from 'fantom-vue3-components/src/test/utils.js';

function createWrapper() {
    return mount(InfoText);
}

describe('InfoText', () => {
    let wrapper = null;

    afterEach(() => {
        destroyWrapper(wrapper);
    });

    it('should match snapshot', () => {
        wrapper = createWrapper();

        expect(wrapper.element).toMatchSnapshot();
    });
});
