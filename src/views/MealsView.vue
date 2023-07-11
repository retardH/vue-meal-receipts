<script setup lang="ts">
import MainContainer from "@/components/MainContainer.vue";
import SearchIcon from "vue-material-design-icons/Magnify.vue";
import {useMeal} from "@/stores/meals";
import ReceiptCard from "@/components/ReceiptCard.vue";
import {storeToRefs} from "pinia";
import {onMounted} from "vue";
const useMealStore = useMeal();
const {searchedMeals, searchMeal, allAreas} = storeToRefs(useMealStore);
onMounted(() => {
  useMealStore.getAllList();
})
</script>

<template>
  <MainContainer>
    <div class="flex items-center justify-center mb-14 mx-auto flex-col md:flex-row">
      <select v-model="useMealStore.selectedCountry" @change="useMealStore.getMealsByCountry()"
              class="py-2 px-1 h-[43.62px] bg-stone-100 border-stone-950 border-2 border-r-0 focus:ring-0 focus:outline-0 text-rose-700">
        <option disabled value="">Select your area</option>
        <option v-for="(c, index) in allAreas" :key="index">{{c.strArea}}</option>
      </select>
      <input type="text" placeholder="Search receipts..."
             v-model="searchMeal"
             @keydown.enter="useMealStore.getAllInfo()"
             class="py-2 px-4 border-stone-950 border-2 border-r-0 bg-stone-100 text-rose-700 placeholder-rose-700 w-auto md:w-64 focus:outline-0 focus:ring-0"/>
      <button class="py-2 px-4 bg-stone-100 border-stone-950 border-l-0 border-2" @click="useMealStore.getAllInfo()">
        <SearchIcon/>
      </button>
    </div>
    <h4 class="text-xl text-red-700 mb-4 uppercase">{{useMealStore.resultText}}</h4>
    <div class="grid grid-cols-12 gap-6" style="justify-items:
    center; justify-content: center;">
      <ReceiptCard v-for="(meal, index) in searchedMeals" :key="index" :meal-info="meal"/>
    </div>
  </MainContainer>
</template>