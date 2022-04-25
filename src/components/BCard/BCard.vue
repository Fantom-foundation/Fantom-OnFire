<template>
    <div class="bcard">
        <slot></slot>
    </div>
</template>

<style lang="scss">
.bcard {
    //color: var(--f-color-grey-1);
    padding: var(--f-spacer-4) var(--f-spacer-4);
    box-shadow: 0 2px 32px rgba(0, 0, 0, 0.15);
    //background: var(--f-color-grey-9);
    background: #fff;
    border-radius: var(--f-border-radius-3);
}
</style>
