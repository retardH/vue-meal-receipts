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
        <div class="w-4/12 flex flex-col gap-2">
          <img :src="mealDetails.strMealThumb" alt="meal-detail" class="w-full"/>
          <p class="text-stone-950 text-base">{{mealDetails.strTags ? `Tags: ${mealDetails.strTags}` : 'No Tags'}}</p>
          <p class="text-stone-950 text-base">{{mealDetails.strCategory && `Categories: ${mealDetails
              .strCategory}`}}</p>
          <a :href="mealDetails.strYoutube" target="_blank"
             class="text-lg underline hover:text-rose-700 cursor-pointer flex-grow-0">Watch on
            YouTube</a>
        </div>
        <div class="flex flex-col gap-8 w-8/12">
          <div class="flex gap-1 flex-1 items-start flex-col">
            <p class="text-lg uppercase font-bold text-rose-700">Ingredients: </p>
            <div class="flex items-center gap-2.5 flex-wrap">
              <p v-for="(ingredient,index) in useMealStore.mealIngredients" :key="index"
                 class="text-sm capitalize border-rose-700 border-2 rounded-3xl py-1 px-4">
                {{ingredient}}
              </p>
            </div>
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