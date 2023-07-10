<script setup lang="ts">
import MainContainer from "@/components/MainContainer.vue";
import RightArrow from "vue-material-design-icons/ArrowRightThin.vue"
</script>

<template>
    <MainContainer>
      <div class="flex items-center justify-center flex-col gap-4" style="height: 80vh">
        <h4 class="text-7xl text-rose-700 font-bold">
          Welcome from `Shloot~Shloot`
        </h4>
        <p class="text-lg text-rose-600">
          Here, you can search for various meal receipts and ingredients.
        </p>
        <button class="bg-rose-700 text-white py-3 px-4 flex items-center gap-2">
          <router-link to="/meals">
            Let's get started!
          </router-link>
          <RightArrow/>
        </button>
      </div>
    </MainContainer>
</template>
