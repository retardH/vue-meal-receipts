<script setup lang="ts">
import {useMeal} from "@/stores/meals";
import {storeToRefs} from "pinia";
import {watch} from "vue";

const ingredients = [
  {
    id: 1,
    name: 'chicken_thighs',
  },
  {
    id: 2,
    name: 'cream_cheese',
  },
  {
    id: 3,
    name: 'butter',
  },
  {
    id: 4,
    name: 'mayonnaise',
  },
  {
    id: 5,
    name: 'noodles',
  },
  {
    id: 7,
    name: 'tofu',
  },
  {
    id: 8,
    name: 'egg_plants',
  },
  {
    id: 9,
    name: 'eggs',
  },
  {
    id: 10,
    name: 'flour',
  },
  {
    id: 11,
    name: 'garlic',
  },
  {
    id: 12,
    name: 'ice_cream',
  },
  {
    id: 13,
    name: 'lemon',
  },
  {
    id: 14,
    name: 'milk',
  },
  {
    id: 15,
    name: 'peas',
  },
  {
    id: 16,
    name: 'potatoes',
  }
]
const useMealStore = useMeal();
const {selectedIngredient} = storeToRefs(useMealStore);
const textParser = (text) => {
  if(text.includes('_')) {
    return text.split('_').join(' ')
  }
  return text;
}
watch(selectedIngredient, (newValue, oldValue) => {
  useMealStore.getMealsByIngredient();
})
</script>

<template>
  <div class="flex flex-col items-center md:items-start gap-2">
    <h4 class="text-base text-rose-700">Search by main ingredients</h4>
    <div class="flex gap-2 flex-wrap items-center justify-center md:justify-start w-full md:w-1/2">
      <div v-for="i in ingredients" :key="i.id" class="flex items-center gap-1">
        <input type="radio" :id="i.name" :value="i.name" v-model="selectedIngredient" class="rounded-none bg-rose-700">
        <label :for="i.name">{{textParser(i.name)}}</label>
      </div>
    </div>
  </div>
</template>