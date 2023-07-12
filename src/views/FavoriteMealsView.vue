<script setup lang="ts">
import ReceiptCard from "@/components/ReceiptCard.vue";
import {useMeal} from "@/stores/meals";
import {storeToRefs} from "pinia";
import MainLayout from "@/components/MainLayout.vue";
import Divider from "@/components/Divider.vue";
const useMealStore = useMeal();
const {favoriteMeals} = storeToRefs(useMealStore);
</script>

<template>
  <MainLayout>
    <h2 class="text-2xl md:text-3xl text-rose-700 uppercase font-bold mb-2">~Your Favorite Meals</h2>
    <Divider/>
    <div class="grid grid-cols-12 gap-6" style="justify-items: center; justify-content: center">
      <ReceiptCard v-for="(meal, index) in favoriteMeals" :key="index" :meal-info="meal"/>
    </div>
    <div style="" class="flex items-center text-2xl md:text-3xl font-bold text-red-700">
      {{useMealStore.favoriteMealsCount === 0 ? `Currently,There's no favorite meals you've selected...` : ''}}
    </div>
  </MainLayout>
</template>