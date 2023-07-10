<script setup lang="ts">
import type {Meal} from "@/types/types";
import HeartOutline from "vue-material-design-icons/HeartOutline.vue";
import HeartFilled from "vue-material-design-icons/Heart.vue";
import Router from "@/router";
import {useMeal} from "@/stores/meals";
import {ref} from "vue";
const useMealStore = useMeal();
defineProps<{
  mealInfo: Meal
}>();
</script>

<template>
  <div class="flex flex-col gap-4 max-w-md shadow-lg bg-stone-100 rounded-md px-2 py-4 col-span-3">
    <img :src="mealInfo.strMealThumb" alt="meal" class="w-full rounded-md">
    <div class="flex items-center justify-between px-4 pb-4 text-rose-700">
      <p class="">
       {{mealInfo.strMeal.length > 22 ? `${mealInfo.strMeal.slice(0,22)}...` : mealInfo.strMeal}}
      </p>
      <button @click="useMealStore.toggleFavorite(mealInfo)">
        <HeartOutline v-if="!useMealStore.isMealFavorite(mealInfo)"/>
        <HeartFilled v-if="useMealStore.isMealFavorite(mealInfo)"/>
      </button>
    </div>
    <button class="bg-rose-700 text-white py-3 px-5" @click="Router.push(`/meal/${mealInfo.idMeal}`)">
      See Detail
    </button>
  </div>
</template>


