<script setup lang="ts">
import { Carousel, Navigation, Pagination, Slide } from "vue3-carousel";
import { useMeal } from "@/stores/meals";
const useMealStore = useMeal();
</script>

<template>
  <Carousel :autoplay="5000" :wrap-around="true">
    <Slide v-for="(c, index) in useMealStore.carouselMeals" :key="index">
      <div
        class="flex items-center w-full md:w-auto justify-center carousel__item h-[300px] relative"
      >
        <img
          :src="c.strMealThumb"
          :alt="c.strMeal"
          class="w-full h-full md:w-auto md:h-auto"
        />
        <div
          class="w-full h-full inset-0 absolute bg-stone-900 opacity-40 z-10"
        ></div>
        <div
          class="w-full h-full absolute top-0 left-0 bottom-0 right-0 flex items-center flex-col justify-center"
        >
          <h4 class="text-white z-20 text-lg">Featured Meal</h4>
          <h4 class="text-white z-20 text-xl font-bold">{{ c.strMeal }}</h4>
        </div>
      </div>
    </Slide>
    <template #addons>
      <Navigation />
      <Pagination />
    </template>
  </Carousel>
</template>
