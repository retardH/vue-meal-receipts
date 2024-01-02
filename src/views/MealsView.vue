<script setup lang="ts">
import { useMeal } from '@/stores/meals';
import ReceiptCard from '@/components/ReceiptCard.vue';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import MealCarousel from '@/components/MealCarousel.vue';
import MainLayout from '@/components/MainLayout.vue';
import Divider from '@/components/Divider.vue';
import IngredientsFilter from '@/components/IngredientsFilter.vue';
const useMealStore = useMeal();
const { searchedMeals, allAreas } = storeToRefs(useMealStore);
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
      <!-- <select
        v-model="useMealStore.selectedCountry"
        @change="useMealStore.getMealsByCountry()"
        class="py-2 px-1 h-[43.62px] bg-stone-50 border-stone-950 border-[1px] focus:ring-0 focus:outline-0 text-rose-700"
      >
        <option disabled value="">Search by your area</option>
        <option v-for="(c, index) in allAreas" :key="index">
          {{ c.strArea }}
        </option>
      </select> -->

      <div class="flex flex-col gap-1 w-6/12 mr-auto">
        <label
          for="countries"
          class="block mb-2 text-sm md:text-base font-medium dark:text-white"
          >Search by country</label
        >
        <select
          id="countries"
          v-model="useMealStore.selectedCountry"
          @change="useMealStore.getMealsByCountry()"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-6/12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option selected value="">Choose a country</option>
          <option v-for="(c, index) in allAreas" :key="index">
            {{ c.strArea }}
          </option>
        </select>
      </div>
      <IngredientsFilter />
    </div>
    <h4
      class="text-xl md:text-2xl font-medium mb-1 tracking-wider text-center uppercase"
    >
      {{ useMealStore.resultText }}
    </h4>
    <Divider />
    <div class="grid grid-cols-12 gap-6 mt-6" style="justify-content: center">
      <ReceiptCard
        v-for="(meal, index) in searchedMeals"
        :key="index"
        :meal-info="meal"
      />
    </div>
  </MainLayout>
</template>
