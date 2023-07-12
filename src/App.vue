<script setup lang="ts">
import { RouterView } from 'vue-router'
import './style.css'
import Navbar from "@/components/Navbar.vue";
import 'vue-loading-overlay/dist/css/index.css';
import UpArrowIcon from "vue-material-design-icons/ChevronUpBox.vue";
import 'vue3-carousel/dist/carousel.css'

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}
</script>

<template>
  <RouterView />
  <div class="fixed bottom-5 right-5">
    <UpArrowIcon :size="50" @click="scrollToTop" class="text-rose-700"/>
  </div>
</template>

