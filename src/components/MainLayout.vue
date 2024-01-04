<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
import MainContainer from '@/components/MainContainer.vue';
// import Footer from "@/components/Footer.vue";
</script>

<template>
  <main
    class="bg-stone-100 rounded-md max-w-[1380px] md:px-4 mx-auto min-h-screen"
  >
    <Navbar />
    <MainContainer>
      <slot />
    </MainContainer>
    <!--    <Footer/>-->
  </main>
</template>
