<script>
import IconFire from '@/assets/vue-icons/IconFire.vue';

export default {
    components: { IconFire },
};
</script>

<script setup>
import { computed } from 'vue';
import FSvgIcon from 'fantom-vue3-components/src/components/FSvgIcon/FSvgIcon.vue';

const props = defineProps({
    /** Icon name. For example icon name for `IconArrowLeft` will be `arrow-left` */
    icon: {
        type: String,
        default: '',
        required: true,
    },
    /** Aria label for svg */
    ariaLabel: {
        type: String,
        default: '',
    },
});

const componentName = computed(() => `icon-${props.icon}`);
</script>

<template>
    <FSvgIcon v-bind="$attrs">
        <component :is="componentName" :aria-label="ariaLabel || null" />
    </FSvgIcon>
</template>
