<script setup lang="ts">
import Router from "@/router";
import {useMeal} from "@/stores/meals";
const useMealStore = useMeal();
</script>

<template>
  <nav class="flex items-center justify-between px-8 py-6 bg-stone-950 mb-16">
    <h4 class="text-2xl text-rose-700 font-bold">Shloot~Shloot</h4>
    <ul class="flex flex-row items-center gap-8">
      <li class="text-rose-700 cursor-pointer" @click="Router.push('/')">Home</li>
      <li class="text-rose-700 cursor-pointer" @click="Router.push('/meals')">Meals</li>
      <li class="text-rose-700 cursor-pointer" @click="Router.push('/categories')">Categories</li>
      <li class="text-rose-700 relative cursor-pointer" @click="Router.push('/favorite')">Favorite Meals
        <span
            class="absolute -top-2 -right-3 bg-rose-700 text-black text-sm w-5 h-5 flex items-center justify-center rounded-full">
          {{useMealStore.favoriteMealsCount}}
        </span>
      </li>
    </ul>
  </nav>
</template>