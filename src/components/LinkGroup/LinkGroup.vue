<script setup>
import AppIconset from '@/components/AppIconset.vue';

defineProps({
    links: {
        type: Array,
        default() {
            return [];
        },
        required: true,
    },
    iconProps: {
        type: Object,
        default() {
            return {};
        },
    },
    showLabels: {
        type: Boolean,
        default: false,
    },
});
</script>

<template>
    <ul class="linkgroup">
        <li v-for="link in links" :key="link.url">
            <a
                :href="link.url"
                :data-tooltip="showLabels ? null : link.tooltip"
                :aria-label="link.tooltip"
                :target="link.target || null"
                data-testcode="linkgroup_link"
            >
                <AppIconset :icon="link.icon" v-bind="iconProps" />
                <span v-if="showLabels && link.label" class="linkgroup_label">{{ link.label }}</span>
            </a>
        </li>
    </ul>
</template>

<style lang="scss">
@use '~fantom-vue3-components/src/assets/scss/elements/links/tools';

.linkgroup {
    --linkgroup-link-color: var(--f-doc-color);
    --linkgroup-link-hover-color: var(--f-doc-color);
    --linkgroup-link-opacity: 0.9;
    --linkgroup-link-hover-opacity: 0.5;

    display: flex;
    list-style-type: none;
    margin-bottom: 0;

    li + li {
        padding-left: var(--f-spacer-3);
    }

    .fsvgicon {
        --fsvgicon-size: 20px;
    }

    &_label {
        padding-inline-start: var(--f-spacer-3);
    }

    @include tools.links() {
        --f-link-link-color: var(--linkgroup-link-color);
        --f-link-visited-color: var(--linkgroup-link-color);
        --f-link-hover-color: var(--linkgroup-link-hover-color);
        --f-link-text-decoration: none;

        display: inline-flex;
        align-items: center;
        opacity: var(--linkgroup-link-opacity);
        transition: color 250ms ease;
    }

    @include tools.links(':hover') {
        opacity: var(--linkgroup-link-hover-opacity);
    }
}

:root.theme-dark {
    .linkgroup {
        --linkgroup-link-color: var(--f-color-grey-1);
        --linkgroup-link-hover-color: var(--f-color-grey-1);
    }
}
</style>
