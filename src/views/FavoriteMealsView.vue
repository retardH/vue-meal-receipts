<script setup lang="ts">
import MainContainer from "@/components/MainContainer.vue";
import ReceiptCard from "@/components/ReceiptCard.vue";
import {useMeal} from "@/stores/meals";
import {storeToRefs} from "pinia";
const useMealStore = useMeal();
const {favoriteMeals} = storeToRefs(useMealStore);
</script>

<template>
  <MainContainer>
    <h2 class="text-4xl text-rose-700 uppercase font-bold mb-6">~Your Favorite Meals</h2>
    <div class="grid grid-cols-12 gap-6">
      <ReceiptCard v-for="(meal, index) in favoriteMeals" :key="index" :meal-info="meal"/>
    </div>
  </MainContainer>
</template>