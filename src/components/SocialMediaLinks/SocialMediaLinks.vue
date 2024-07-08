<script setup>
import LinkGroup from '@/components/LinkGroup/LinkGroup.vue';

const SOCIAL_MEDIA_LINKS = [
    {
        url: 'https://twitter.com/FantomFDN',
        tooltip: 'Fantom on Twitter',
        label: 'Twitter',
        icon: 'twitter',
        target: '_blank',
    },
    /*
    {
        url: 'http://chat.fantom.network/',
        tooltip: 'Fantom on Discord',
        label: 'Discord',
        icon: 'discord',
        target: '_blank',
    },
*/
    {
        url: 'https://t.me/Fantom_English',
        tooltip: 'Fantom on Telegram',
        label: 'Telegram',
        icon: 'telegram',
        target: '_blank',
    },
    {
        url: 'https://www.reddit.com/r/FantomFoundation/',
        tooltip: 'Fantom on Reddit',
        label: 'Reddit',
        icon: 'reddit',
        target: '_blank',
    },
    {
        url: 'https://github.com/Fantom-Foundation',
        tooltip: 'Fantom on Github',
        label: 'Github',
        icon: 'github',
        target: '_blank',
    },
];
</script>

<template>
    <section class="socialmedialinks" aria-labelledby="smlinksid">
        <h2 id="smlinksid" class="not-visible">Social media links</h2>
        <LinkGroup :links="SOCIAL_MEDIA_LINKS" :icon-props="{ size: '32px' }" show-labels />
    </section>
</template>

<style lang="scss">
@use '~fantom-vue3-components/src/assets/scss/tools/media';

.socialmedialinks {
    .linkgroup {
        display: flex;
        justify-content: space-between;
        margin-top: var(--f-spacer-9);
        border-top: 1px solid var(--f-color-grey-3);
        padding: var(--f-spacer-7);

        &_label {
            font-size: var(--f-font-size-5);
        }
    }
}

:root.theme-dark {
    .socialmedialinks {
        .linkgroup {
            border-top: 1px solid var(--theme-dark-color-6);
        }
    }
}

@include media.media-max(970px) {
    .socialmedialinks {
        .linkgroup {
            &_label {
                display: none;
            }
        }
    }
}
</style>
