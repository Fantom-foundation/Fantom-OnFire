<script setup>
import SocialMediaLinks from '@/components/SocialMediaLinks/SocialMediaLinks.vue';
</script>

<template>
    <header class="bheader">
        <div class="bheader_logo">
            <a href="https://fantom.foundation/" target="_blank" rel="nofollow" title="Fantom Foundation">
                <img src="/fantom-logo.svg" alt="Fantom logo" data-testid="logo" />
            </a>
        </div>
        <SocialMediaLinks />
    </header>
</template>

<style lang="scss">
.bheader {
    display: flex;
    background: var(--f-color-primary-5);
    height: 53px;
    justify-content: space-between;
    align-items: center;
    padding: 0 var(--f-spacer-3) 0 var(--f-spacer-3);

    &_logo {
        img {
            display: block;
            max-height: var(--f-spacer-5);
        }
    }
}
</style>
