<script setup lang="ts">
import type { Meal } from '@/types/types';
import Button from '@/components/Button.vue';
import Router from '@/router';
import { useMeal } from '@/stores/meals';
const useMealStore = useMeal();
defineProps<{
  mealInfo: Meal;
}>();
</script>

<template>
  <div
    class="flex flex-col gap-4 max-w-md shadow-lg overflow-hidden bg-stone-50 rounded-sm box-border col-span-full md:col-span-4 lg:col-span-3 self-center"
  >
    <img :src="mealInfo.strMealThumb" alt="meal" class="w-full h-[260px]" />
    <div class="flex items-center px-2 justify-between box-border">
      <p class="flex-1 text-base pr-2">
        {{
          mealInfo.strMeal.length > 24
            ? mealInfo.strMeal.slice(0, 24) + '...'
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
          class="fa-solid text-rose-600 fa-heart text-lg"
        ></i>
      </button>
    </div>
    <Button
      style-class="bg-rose-600 py-2 px-5 rounded-sm mb-3 mx-2"
      @click="Router.push(`/meal/${mealInfo.idMeal}`)"
    >
      <template #text> Detail </template>
    </Button>
  </div>
</template>
