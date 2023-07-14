<script setup lang="ts">
import type { Meal } from "@/types/types";
import Button from "@/components/Button.vue";
import Router from "@/router";
import { useMeal } from "@/stores/meals";
const useMealStore = useMeal();
defineProps<{
  mealInfo: Meal;
}>();
</script>

<template>
  <div
    class="flex flex-col gap-4 max-w-md shadow-lg bg-stone-100 rounded-sm px-2 py-4 col-span-full md:col-span-4 2xl:col-span-3 self-center"
  >
    <img :src="mealInfo.strMealThumb" alt="meal" class="w-full rounded-sm" />
    <div class="flex items-center justify-between px-4 text-rose-700">
      <p class="flex-1 text-xl md:text-lg xl:text-base">
        {{
          mealInfo.strMeal.length > 24
            ? `${mealInfo.strMeal.slice(0, 24)}...`
            : mealInfo.strMeal
        }}
      </p>
      <button @click="useMealStore.toggleFavorite(mealInfo)">
        <i
          v-if="!useMealStore.isMealFavorite(mealInfo)"
          class="fa-regular fa-heart text-lg"
        ></i>
        <i
          v-if="useMealStore.isMealFavorite(mealInfo)"
          class="fa-solid fa-heart text-lg"
        ></i>
      </button>
    </div>
    <Button
      style-class="bg-rose-700 rounded-sm"
      @click="Router.push(`/meal/${mealInfo.idMeal}`)"
    >
      <template #text>
        Detail
      </template>
    </Button>
  </div>
</template>
