<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
import MainContainer from "@/components/MainContainer.vue";
import Footer from "@/components/Footer.vue";
</script>

<template>
  <main>
    <Navbar/>
    <MainContainer>
      <slot/>
    </MainContainer>
<!--    <Footer/>-->
  </main>
</template>