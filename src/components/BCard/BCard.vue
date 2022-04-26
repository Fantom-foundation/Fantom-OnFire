<template>
    <div class="bcard">
        <slot></slot>
    </div>
</template>

<style lang="scss">
.bcard {
    //color: var(--f-color-grey-1);
    padding: var(--f-spacer-4) var(--f-spacer-4);
    box-shadow: 0 8px 16px 0 rgba(48, 49, 51, 0.1), 0 0 1px 0 rgba(48, 49, 51, 0.05);
    //background: var(--f-color-grey-9);
    background: #fff;
    border-radius: var(--f-border-radius-4);
}
</style>
