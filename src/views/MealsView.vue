<script setup lang="ts">
import MainContainer from "@/components/MainContainer.vue";
import SearchIcon from "vue-material-design-icons/Magnify.vue";
import {useMeal} from "@/stores/meals";
import ReceiptCard from "@/components/ReceiptCard.vue";
import {storeToRefs} from "pinia";
const useMealStore = useMeal();
const {searchedMeals, searchMeal} = storeToRefs(useMealStore);
</script>

<template>
  <MainContainer>
    <div class="flex items-center mb-14">
      <input type="text" placeholder="Search receipts..."
             v-model="searchMeal"
             @keydown.enter="useMealStore.getAllInfo()"
             class="py-2 px-4 border-stone-950 border-2 bg-stone-300 text-rose-700 placeholder-rose-700 w-64"/>
      <button class="py-2 px-4 bg-stone-300 border-stone-950 border-l-0 border-2" @click="useMealStore.getAllInfo()">
        <SearchIcon/>
      </button>
    </div>
    <div class="grid grid-cols-12 gap-6">
      <ReceiptCard v-for="(meal, index) in searchedMeals" :key="index" :meal-info="meal"/>
    </div>
  </MainContainer>
</template>