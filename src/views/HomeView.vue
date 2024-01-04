<template>
  <MainLayout>
    <div
      class="flex items-center justify-center flex-col gap-4"
      style="height: calc(80vh - 40px)"
    >
      <h4
        class="text-3xl md:text-5xl text-center lg:text-7xl text-rose-600 font-semibold"
      >
        Welcome from `Shloot~Shloot`
      </h4>
      <p class="text-base md:text-lg text-center">
        Here, you can search for various meal receipts and ingredients.
      </p>
      <Button style-class="bg-rose-600 rounded-sm flex items-center gap-2">
        <template #text>
          <router-link to="/meals"> Let's find meals! </router-link>
        </template>
        <template #rightIcon>
          <i class="fa-solid fa-arrow-right text-lg"></i>
        </template>
      </Button>
      <hr />
      <hr />
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import MainLayout from '@/components/MainLayout.vue';
import Button from '@/components/Button.vue';
</script>
