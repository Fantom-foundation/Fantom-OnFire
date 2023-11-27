import { describe, it, afterEach, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { destroyWrapper } from 'fantom-vue3-components/src/test/utils.js';
import LinkGroup from '@/modules/common/components/LinkGroup/LinkGroup.vue';

let wrapper = null;

function LINKS() {
    return [
        {
            url: 'https://twitter.com/FantomFDN',
            tooltip: 'Fantom on Twitter',
            label: 'Twitter',
            icon: 'close',
            target: '_blank',
        },
        {
            url: 'http://chat.fantom.network/',
            tooltip: 'Fantom on Discord',
            label: 'Discord',
            icon: 'close',
        },
    ];
}

function createWrapper(
    options = {
        props: {
            links: LINKS(),
        },
    }
) {
    return mount(LinkGroup, options);
}

afterEach(() => {
    destroyWrapper(wrapper);
});

describe('LinkGroup', () => {
    it('should display link url', () => {
        wrapper = createWrapper();

        const links = wrapper.findByTestCode('linkgroup_link');

        expect(links[0].attributes('href')).toBe('https://twitter.com/FantomFDN');
        expect(links[1].attributes('href')).toBe('http://chat.fantom.network/');
    });

    it('should display link tooltip', () => {
        wrapper = createWrapper();

        const links = wrapper.findByTestCode('linkgroup_link');

        expect(links[0].attributes('data-tooltip')).toBe('Fantom on Twitter');
        expect(links[0].attributes('aria-label')).toBe('Fantom on Twitter');
        expect(links[1].attributes('data-tooltip')).toBe('Fantom on Discord');
        expect(links[1].attributes('aria-label')).toBe('Fantom on Discord');
    });

    it('should display link icon', () => {
        wrapper = createWrapper();

        const links = wrapper.findByTestCode('linkgroup_link');

        expect(links[0].find('.fsvgicon').exists()).toBe(true);
        expect(links[1].find('.fsvgicon').exists()).toBe(true);
    });

    it('should set link "target" attribute', () => {
        wrapper = createWrapper();

        const links = wrapper.findByTestCode('linkgroup_link');

        expect(links[0].attributes('target')).toBe('_blank');
        expect(links[1].attributes('target')).toBeUndefined();
    });

    it('should set icon props', () => {
        wrapper = createWrapper({
            props: {
                iconProps: {
                    size: '40px',
                },
                links: LINKS(),
            },
        });

        const links = wrapper.findByTestCode('linkgroup_link');

        expect(links[0].find('.fsvgicon').element.style.width).toBe('40px');
        expect(links[0].find('.fsvgicon').element.style.height).toBe('40px');
    });

    it('should display label', () => {
        wrapper = createWrapper({
            props: {
                showLabels: true,
                links: LINKS(),
            },
        });

        const links = wrapper.findByTestCode('linkgroup_link');

        expect(links[0].text()).toContain('Twitter');
        expect(links[1].text()).toContain('Discord');
    });

    it('should hide tooltip if labels are displayed', () => {
        wrapper = createWrapper({
            props: {
                showLabels: true,
                links: LINKS(),
            },
        });

        const links = wrapper.findByTestCode('linkgroup_link');

        expect(links[0].attributes('data-tooltip')).toBeUndefined();
        expect(links[1].attributes('data-tooltip')).toBeUndefined();
    });
});
