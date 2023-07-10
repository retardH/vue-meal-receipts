<script setup lang="ts">
import { RouterView } from 'vue-router'
import './style.css'
import Navbar from "@/components/Navbar.vue";
import 'vue-loading-overlay/dist/css/index.css';
</script>

<template>
  <Navbar/>
  <RouterView />
</template>

<style scoped>

</style>
