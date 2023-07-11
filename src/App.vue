<script setup lang="ts">
import { RouterView } from 'vue-router'
import './style.css'
import Navbar from "@/components/Navbar.vue";
import 'vue-loading-overlay/dist/css/index.css';
import UpArrowIcon from "vue-material-design-icons/ChevronUpBox.vue";
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}
</script>

<template>
  <Navbar/>
  <RouterView />
  <div class="fixed bottom-5 right-5">
    <UpArrowIcon :size="50" @click="scrollToTop" class="text-rose-700"/>
  </div>
</template>

