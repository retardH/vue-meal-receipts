<script setup lang="ts">
import MainContainer from "@/components/MainContainer.vue";
import {useMeal} from "@/stores/meals";
import {storeToRefs} from "pinia";
import {onMounted} from "vue";
const useMealStore = useMeal();
const {categories} = storeToRefs(useMealStore);
onMounted(() => {
  useMealStore.getCategories();
})
</script>

<template>
  <MainContainer>
    <div class="flex flex-col gap-6 w-full">
      <h4 class="text-4xl text-rose-700 font-bold uppercase">~Categories</h4>
      <div v-for="(c, index) in categories" :key="index"
           class="flex items-start gap-4 bg-stone-100 shadow-md p-6 cursor-pointer hover:shadow-lg"
           @click="useMealStore.getAllMealsByCategory(c.strCategory)">
        <img :src="c.strCategoryThumb" alt=""/>
        <div class="flex-1 flex flex-col gap-3">
          <h4 class="font-bold text-2xl text-rose-700">{{c.strCategory}}</h4>
          <p class="text-lg text-rose-700">{{ c.strCategoryDescription }}</p>
        </div>
      </div>
    </div>
  </MainContainer>
</template>