<script setup lang="ts">
import { RouterView } from "vue-router";
import "./style.css";
import "vue-loading-overlay/dist/css/index.css";
import "vue3-carousel/dist/carousel.css";
import { initFlowbite } from "flowbite";
import { onMounted } from "vue";

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

onMounted(() => {
  initFlowbite();
})
</script>

<template>
  <RouterView />
  <div class="fixed bottom-5 right-5">
    <i
      class="fa-solid fa-circle-chevron-up text-4xl text-rose-700"
      @click="scrollToTop"
    ></i>
  </div>
</template>
