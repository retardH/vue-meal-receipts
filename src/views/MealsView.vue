<script setup lang="ts">
import { useMeal } from "@/stores/meals";
import ReceiptCard from "@/components/ReceiptCard.vue";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import MealCarousel from "@/components/MealCarousel.vue";
import MainLayout from "@/components/MainLayout.vue";
import Divider from "@/components/Divider.vue";
import IngredientsFilter from "@/components/IngredientsFilter.vue";
const useMealStore = useMeal();
const { searchedMeals, searchMeal, allAreas } = storeToRefs(useMealStore);
onMounted(() => {
  useMealStore.getAllList();
  if (searchedMeals.value.length <= 0) {
    useMealStore.getMealsByCountry();
  }
});
</script>

<template>
  <MainLayout>
<!--    <div class="flex md:hidden items-center border-stone-950 border-2">-->
<!--      <input-->
<!--          type="text"-->
<!--          placeholder="Search receipts..."-->
<!--          v-model="searchMeal"-->
<!--          @keydown.enter="useMealStore.getAllInfo()"-->
<!--          class="py-2 px-4 rounded-sm bg-stone-50 text-rose-700 placeholder-rose-700 w-auto md:w-64 focus:outline-0 focus:ring-0"-->
<!--      />-->
<!--      <button-->
<!--          class="py-2 px-4 bg-stone-50"-->
<!--          @click="useMealStore.getAllInfo()"-->
<!--      >-->
<!--        <SearchIcon />-->
<!--      </button>-->
<!--    </div>-->
    <div v-if="searchedMeals && searchedMeals.length > 0" class="w-full mb-14">
      <MealCarousel />
    </div>
    <div
      class="flex items-center md:items-start justify-between mb-12 mx-auto flex-col gap-2.5 md:flex-row"
    >
      <IngredientsFilter />
      <select
        v-model="useMealStore.selectedCountry"
        @change="useMealStore.getMealsByCountry()"
        class="py-2 px-1 h-[43.62px] bg-stone-50 border-stone-950 border-[1px] focus:ring-0 focus:outline-0 text-rose-700"
      >
        <option disabled value="">Search by your area</option>
        <option v-for="(c, index) in allAreas" :key="index">
          {{ c.strArea }}
        </option>
      </select>
    </div>
    <h4
      class="text-xl md:text-2xl text-red-700 mb-1 tracking-wider text-center uppercase"
    >
      {{ useMealStore.resultText }}
    </h4>
    <Divider />
    <div
      class="grid grid-cols-12 gap-6"
      style="justify-items: center; justify-content: center"
    >
      <ReceiptCard
        v-for="(meal, index) in searchedMeals"
        :key="index"
        :meal-info="meal"
      />
    </div>
  </MainLayout>
</template>
