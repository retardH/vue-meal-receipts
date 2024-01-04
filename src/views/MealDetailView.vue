<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useMeal } from '@/stores/meals';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { useLoadingState } from '@/stores/loading';
import MainLayout from '@/components/MainLayout.vue';
import Divider from '@/components/Divider.vue';
import Button from '@/components/Button.vue';
import Router from '@/router';
const useMealStore = useMeal();
const useLoadingStore = useLoadingState();
const { mealDetails } = storeToRefs(useMealStore);
const route = useRoute();
const instructionsList =
  mealDetails.value?.strInstructions?.split('\r\n') || [];
onMounted(() => {
  useMealStore.getMealDetails(route.params.id);
});
const youtubeUrlWithId = computed(() => {
  if (mealDetails.value.strYoutube) {
    let index = mealDetails.value.strYoutube?.lastIndexOf('=');
    console.log(mealDetails.value.strYoutube);
    console.log(index);
    return (
      'https://www.youtube.com/embed/' +
      mealDetails.value.strYoutube.slice(
        index + 1,
        mealDetails.value.strYoutube.length
      )
    );
  }
  return null;
});
</script>

<template>
  <MainLayout>
    <div v-if="!useLoadingStore.isLoading" class="w-full flex flex-col gap-1">
      <div class="flex-1 mb-2">
        <Button
          style-class="bg-rose-600 flex-1 px-8 rounded-sm flex-grow-0 flex-shrink-0 mb-2 flex items-center gap-1"
          @click="Router.push('/meals')"
        >
          <template #leftIcon>
            <i class="fa-solid fa-arrow-left text-lg"></i>
          </template>
          <template #text> Back </template>
        </Button>
      </div>
      <h4 class="text-xl md:text-2xl tracking-wide leading-tight font-semibold">
        {{ mealDetails.strMeal }}
      </h4>
      <Divider />
      <div class="flex items-start flex-col md:flex-row gap-6 pb-2">
        <div class="w-full md:w-4/12 flex flex-col">
          <figure class="flex-1 relative detail-img overflow-hidden">
            <img
              :src="mealDetails.strMealThumb"
              alt="meal-detail"
              class="rounded-md"
            />
            <div
              class="absolute inset-0 w-full h-full bg-stone-900 rounded-md detail-text-overlay z-20"
            ></div>
            <div
              class="flex-col flex items-center justify-center absolute inset-0 w-full h-full flex-1 mt-2.5 z-30 detail-text"
            >
              <p class="text-stone-100 text-base md:text-lg font-semibold">
                {{
                  mealDetails.strTags
                    ? `Tags: ${mealDetails.strTags}`
                    : 'No Tags'
                }}
              </p>
              <p class="text-stone-100 text-base md:text-lg font-semibold my-2">
                {{
                  mealDetails.strCategory &&
                  `Categories: ${mealDetails.strCategory}`
                }}
              </p>
            </div>
          </figure>
        </div>
        <div class="flex flex-col gap-8 w-full md:w-8/12">
          <div class="flex gap-1 flex-1 items-start flex-col">
            <p
              class="text-base md:text-lg uppercase font-semibold tracking-wide mb-2"
            >
              Ingredients
            </p>
            <div class="flex items-center gap-2.5 flex-wrap">
              <p
                v-for="(ingredient, index) in useMealStore.mealIngredients"
                :key="index"
                class="text-xs md:text-sm capitalize bg-rose-600 text-stone-50 rounded-md py-1 px-2"
              >
                {{ ingredient }}
              </p>
            </div>
          </div>
          <div>
            <p
              class="text-base md:text-lg font-semibold tracking-wide uppercase mb-2"
            >
              Instructions
            </p>
            <ul>
              <li
                v-for="(instruction, index) in instructionsList"
                :key="index"
                class="text-sm md:text-base leading-7 tracking-normal list-disc list-inside"
              >
                {{ instruction }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Divider />
      <iframe
        v-if="youtubeUrlWithId"
        class="w-full h-[350px] md:h-[500px]"
        :src="youtubeUrlWithId"
        frameborder="0"
        allowfullscreen
      ></iframe>
    </div>
  </MainLayout>
</template>

<style scoped>
.detail-img:hover .detail-text {
  opacity: 1 !important;
}

.detail-img:hover .detail-text-overlay {
  opacity: 0.4 !important;
}

.detail-text {
  opacity: 0 !important;
  transition: all 0.3s ease-in-out;
}

.detail-text-overlay {
  opacity: 0 !important;
  transition: all 0.3s ease-in-out;
}
</style>
