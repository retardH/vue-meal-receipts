<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useMeal } from "@/stores/meals";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { useLoadingState } from "@/stores/loading";
import MainLayout from "@/components/MainLayout.vue";
import Divider from "@/components/Divider.vue";
import Router from "@/router";
const useMealStore = useMeal();
const useLoadingStore = useLoadingState();
const { mealDetails } = storeToRefs(useMealStore);
const route = useRoute();
onMounted(() => {
  console.log(route.params.id);
  useMealStore.getMealDetails(route.params.id);
});
const youtubeUrlWithId = computed(() => {
  if (mealDetails.value.strYoutube) {
    let index = mealDetails.value.strYoutube?.lastIndexOf("=");
    console.log(mealDetails.value.strYoutube);
    console.log(index);
    return (
      "https://www.youtube.com/embed/" +
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
    <div class="w-full flex flex-col gap-1">
      <div class="flex-1">
        <button
          class="bg-rose-700 text-stone-100 flex-1 flex-grow-0 flex-shrink-0 py-2 px-5 text-base rounded-sm mb-2 flex items-center gap-1"
          @click="Router.push('/meals')"
        >
          <i class="fa-solid fa-arrow-left text-lg"></i>Back
        </button>
      </div>
      <h4 class="text-2xl md:text-3xl text-rose-700 font-bold">
        ~{{ mealDetails.strMeal }}
      </h4>
      <Divider />
      <div class="flex items-start flex-col md:flex-row gap-6 pb-2">
        <div class="w-full md:w-4/12 flex flex-col">
          <figure class="flex-1 relative detail-img">
            <img :src="mealDetails.strMealThumb" alt="meal-detail" />
            <div
              class="absolute inset-0 w-full h-full bg-stone-900 detail-text-overlay z-20"
            ></div>
            <div
              class="flex-col flex items-center justify-center absolute inset-0 w-full h-full flex-1 mt-2.5 z-30 detail-text"
            >
              <p class="text-stone-100 text-lg font-bold">
                {{
                  mealDetails.strTags
                    ? `Tags: ${mealDetails.strTags}`
                    : "No Tags"
                }}
              </p>
              <p class="text-stone-100 text-lg font-bold my-2">
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
            <p class="text-lg uppercase font-bold text-rose-700">
              Ingredients:
            </p>
            <div class="flex items-center gap-2.5 flex-wrap">
              <p
                v-for="(ingredient, index) in useMealStore.mealIngredients"
                :key="index"
                class="text-sm capitalize border-rose-700 border-2 rounded-2xl py-1 px-4"
              >
                #{{ ingredient }}
              </p>
            </div>
          </div>
          <div>
            <p class="text-lg font-bold text-rose-700 uppercase">
              Instructions:
            </p>
            <p class="text-base leading-6 tracking-normal">
              {{ mealDetails.strInstructions }}
            </p>
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
