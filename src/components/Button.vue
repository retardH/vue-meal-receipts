<script setup lang="ts">
const props = defineProps({
  styleClass: String,
});
</script>

<template>
  <button
    class="text-stone-100 transition-all rounded-sm py-1 md:py-2 px-4 md:px-5 text-sm md:text-base hover:brightness-90 focus:brightness-100"
    :class="props.styleClass"
  >
    <slot name="leftIcon"></slot>
    <slot name="text"></slot>
    <slot name="rightIcon"></slot>
  </button>
</template>
