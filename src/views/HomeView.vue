<script setup lang="ts">
import MainContainer from "@/components/MainContainer.vue";
import RightArrow from "vue-material-design-icons/ArrowRightThin.vue"
import MainLayout from "@/components/MainLayout.vue";
</script>

<template>
    <MainLayout>
      <div class="flex items-center justify-center flex-col gap-4" style="height: calc(80vh - 40px)">
        <h4 class="text-3xl md:text-5xl text-center lg:text-7xl text-rose-700 font-bold">
          Welcome from `Shloot~Shloot`
        </h4>
        <p class="text-base md:text-lg text-rose-600 text-center">
          Here, you can search for various meal receipts and ingredients.
        </p>
        <button class="bg-rose-700 text-white py-3 px-4 flex items-center gap-2">
          <router-link to="/meals">
            Let's find meals!
          </router-link>
          <RightArrow/>
        </button>
      </div>
    </MainLayout>
</template>
