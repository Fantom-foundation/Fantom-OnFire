<script setup>
import AppIconset from '@/components/AppIconset.vue';
</script>

<template>
    <ul class="socialmedialinks">
        <li>
            <a href="https://twitter.com/FantomFDN" target="_blank" rel="nofollow" title="Fantom on Twitter">
                <AppIconset icon="twitter" />
            </a>
        </li>
        <li>
            <a href="http://chat.fantom.network/" target="_blank" rel="nofollow" title="Fantom on Discord">
                <AppIconset icon="discord" />
            </a>
        </li>
        <li>
            <a href="https://t.me/Fantom_English" target="_blank" rel="nofollow" title="Fantom on Telegram">
                <AppIconset icon="telegram" />
            </a>
        </li>
        <li>
            <a
                href="https://www.reddit.com/r/FantomFoundation/"
                target="_blank"
                rel="nofollow"
                title="Fantom on Reddit"
            >
                <AppIconset icon="reddit" />
            </a>
        </li>
        <li>
            <a href="https://github.com/Fantom-Foundation" target="_blank" rel="nofollow" title="Fantom on Github">
                <AppIconset icon="github" />
            </a>
        </li>
    </ul>
</template>

<style lang="scss">
@use '~fantom-vue3-components/src/assets/scss/elements/links/tools';

.socialmedialinks {
    display: flex;
    list-style-type: none;

    li + li {
        padding-left: var(--f-spacer-3);
    }

    .fsvgicon {
        --fsvgicon-size: 20px;
    }

    @include tools.links() {
        --f-link-link-color: var(--f-color-primary-4);
        --f-link-visited-color: var(--f-color-primary-4);
        --f-link-hover-color: var(--f-color-primary-2);

        transition: color 250ms ease;
    }
}
</style>
