<script setup lang="ts">
import MainContainer from "@/components/MainContainer.vue";
import {onMounted} from "vue";
import {useMeal} from "@/stores/meals";
import {storeToRefs} from "pinia";
import {useRoute} from 'vue-router'
import {useLoadingState} from "@/stores/loading";
const useMealStore = useMeal();
const useLoadingStore = useLoadingState();
const {mealDetails} = storeToRefs(useMealStore);
const route = useRoute();
onMounted(() => {
  console.log(route.params.id);
  useMealStore.getMealDetails(route.params.id);
})

</script>

<template>
  <MainContainer>
    <div class="w-full flex flex-col gap-6" v-if="!useLoadingStore.isLoading">
      <h4 class="text-4xl text-rose-700 font-bold">~{{mealDetails.strMeal}}</h4>
      <div class="flex items-start gap-6">
        <img :src="mealDetails.strMealThumb" alt="meal-detail" class="w-full w-5/12"/>
        <div class="flex flex-col gap-8">
          <div class="flex flex-row gap-4 flex-1 items-center flex-wrap">
            <p class="text-lg uppercase font-bold text-rose-700">Ingredients: </p>
            <p v-for="(ingredient,index) in useMealStore.mealIngredients" :key="index"
               class="text-base capitalize border-rose-700 border-2 rounded-3xl py-2 px-6">
              {{ingredient}}
            </p>
          </div>
          <div>
            <p class="text-lg font-bold text-rose-700 uppercase">Instructions: </p>
            <p class="text-base leading-6 tracking-normal">
              {{mealDetails.strInstructions}}
            </p>
          </div>
        </div>
      </div>
    </div>
  </MainContainer>
</template>