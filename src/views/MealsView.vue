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
const { searchedMeals, allAreas, searchMeal } = storeToRefs(useMealStore);
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
    <!-- <div v-if="searchedMeals && searchedMeals.length > 0" class="w-full mb-14">
      <MealCarousel />
    </div> -->
    <label
      for="meal-name"
      class="block mb-2 text-sm md:text-base font-medium dark:text-white"
    >
      Search meals by name
    </label>
    <div
      class="w-full mb-8 flex items-center overflow-hidden border-stone-700 rounded-md border-[1px]"
    >
      <input
        id="meal-name"
        type="text"
        placeholder="Eg, Lamb Biryani"
        v-model="searchMeal"
        @keydown.enter="useMealStore.getAllInfo()"
        class="py-2 px-2.5 md:px-4 flex-1 text-sm md:text-base rounded-md bg-stone-50 border-none placeholder:text-stone-500 w-auto md:w-64 focus:outline-0 focus:ring-0"
      />
      <button class="py-2 px-4 bg-rose-600" @click="useMealStore.getAllInfo()">
        <i class="fa-solid text-stone-50 fa-magnifying-glass"></i>
      </button>
    </div>
    <div
      class="flex md:hidden items-center md:items-start justify-between mb-12 mx-auto flex-col gap-2.5 md:flex-row"
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

      <div class="flex flex-col gap-1 w-full md:w-6/12 mr-auto">
        <label
          for="countries"
          class="block mb-2 text-sm md:text-base font-medium dark:text-white"
          >Search meals by country</label
        >
        <select
          id="countries"
          v-model="useMealStore.selectedCountry"
          @change="useMealStore.getMealsByCountry()"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-6/12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option selected value="">Choose a country</option>
          <option v-for="(c, index) in allAreas" :key="index">
            {{ c.strArea }}
          </option>
        </select>
      </div>
      <!-- <IngredientsFilter /> -->
    </div>
    <div class="flex items-end justify-between mb-2">
      <h4
        class="flex-1 text-lg md:text-2xl font-medium tracking-wider text-left uppercase"
      >
        {{ useMealStore.resultText }}
      </h4>
      <select
        id="countries"
        v-model="useMealStore.selectedCountry"
        @change="useMealStore.getMealsByCountry()"
        class="hidden md:block bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option selected value="">Search by country</option>
        <option v-for="(c, index) in allAreas" :key="index">
          {{ c.strArea }}
        </option>
      </select>
    </div>

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
