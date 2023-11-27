<script setup></script>

<template>
    <header class="bheader">
        <div class="bheader_logo">
            <a href="https://fantom.foundation/" target="_blank" rel="nofollow" title="Fantom Foundation">
                <img src="/fantom-logo-blue.svg" alt="Fantom logo" data-testid="logo" />
            </a>
        </div>
    </header>
</template>

<style lang="scss">
.bheader {
    display: flex;
    //background: var(--f-color-primary-5);
    height: var(--f-spacer-9);
    justify-content: space-between;
    align-items: center;
    padding: 0 var(--f-spacer-4);
    width: 100%;
    max-width: 940px;
    margin: 0 auto;

    &_logo {
        img {
            display: block;
            max-height: 32px;
        }
    }
}
</style>
