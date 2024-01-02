<script setup lang="ts">
const props = defineProps({
  styleClass: String,
});
</script>

<template>
  <button
    class="text-stone-100 rounded-sm py-2 px-5 text-base hover:brightness-90 focus:brightness-100 transition-all"
    :class="props.styleClass"
  >
    <slot name="leftIcon"></slot>
    <slot name="text"></slot>
    <slot name="rightIcon"></slot>
  </button>
</template>
