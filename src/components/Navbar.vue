<script setup lang="ts">
import Router from "@/router";
import {useMeal} from "@/stores/meals";
import MenuIcon from "vue-material-design-icons/Menu.vue";
import {useRoute} from "vue-router";
const useMealStore = useMeal();
const route = useRoute();

</script>

<template>
  <nav
      class=" items-center flex flex-row px-4 md:px-8 backdrop-blur-lg py-4 mb-12 sticky top-0 border-b-rose-500 border-b-2 z-50">
    <h4 class="text-2xl lg:text-3xl text-rose-700 font-bold">Shloot~Shloot</h4>
    <MenuIcon class="mr-2 text-rose-700 md:hidden ml-auto"/>
    <ul class="flex-row items-center gap-8 ml-auto hidden md:flex">
      <li class="text-rose-700 cursor-pointer" @click="Router.push('/')" :class="{'font-bold': route.path === '/'}">Home
      </li>
      <li class="text-rose-700 cursor-pointer" @click="Router.push('/meals')" :class="{'font-bold': route.path ===
      '/meals'}">Meals</li>
      <li class="text-rose-700 cursor-pointer"
          @click="Router.push('/categories')" :class="{'font-bold': route.path === '/categories'}">Categories
      </li>
      <li class="text-rose-700 relative cursor-pointer"
          @click="Router.push('/favorite')" :class="{'font-bold': route.path === '/favorite'}">Favorite
        <span
            class="absolute -top-2 -right-3 bg-rose-700 text-black text-sm w-5 h-5 flex items-center justify-center rounded-full">
          {{useMealStore.favoriteMealsCount}}
        </span>
      </li>
    </ul>
  </nav>
</template>