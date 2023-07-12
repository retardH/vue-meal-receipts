<script setup lang="ts">

import Navbar from "@/components/Navbar.vue";
import MainContainer from "@/components/MainContainer.vue";
</script>

<template>
  <main>
    <Navbar/>
    <MainContainer>
      <slot/>
    </MainContainer>
  </main>
</template>