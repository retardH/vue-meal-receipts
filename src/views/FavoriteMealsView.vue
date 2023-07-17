<script setup lang="ts">
import ReceiptCard from "@/components/ReceiptCard.vue";
import {useMeal} from "@/stores/meals";
import {storeToRefs} from "pinia";
import MainLayout from "@/components/MainLayout.vue";
import Divider from "@/components/Divider.vue";
import Router from "@/router";
import Button from "@/components/Button.vue";
const useMealStore = useMeal();
const {favoriteMeals} = storeToRefs(useMealStore);
const localFavoriteMeals = JSON.parse(<string>localStorage.getItem('favoriteMeals'));
console.log(localFavoriteMeals);
console.log(favoriteMeals);
</script>

<template>
  <MainLayout>
    <Button
        style-class="bg-rose-700 flex-1 flex-grow-0 flex-shrink-0 mb-2 flex items-center gap-1"
        @click="Router.go(-1)"
    >
      <template #leftIcon>
        <i class="fa-solid fa-arrow-left text-lg"></i>
      </template>
      <template #text>
        Back
      </template>
    </Button>
    <h2 class="text-2xl md:text-3xl text-rose-700 uppercase font-bold mb-2">~Your Favorite Meals</h2>
    <Divider/>
    <transition name="switch" mode="out-in">
      <div v-if="useMealStore.favoriteMealsCount > 0">
        <transition-group name="fav" tag='div' class="grid grid-cols-12 gap-6" style="justify-items: center;
      justify-content:
      center">
          <ReceiptCard v-for="meal in favoriteMeals" :key="meal.strMeal" :meal-info="meal"/>
        </transition-group>
      </div>
      <div v-else
           class="flex text-center items-center justify-center mt-8 text-2xl md:text-3xl font-bold text-red-700">
        Currently,There's no favorite meals you've selected...
      </div>
    </transition>
  </MainLayout>
</template>

<style>
.fav-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

.fav-leave-active {
  transition: all 500ms ease;
}

.switch-enter-from,
.switch-leave-to {
  opacity: 0;
}
.switch-enter-active{
  transition: all 0.3s ease;
}
.switch-leave-active {
  transition: all 0.3s ease;
}

</style>