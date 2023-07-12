<script setup lang="ts">
import Router from "@/router";
import { useMeal } from "@/stores/meals";
import {computed, onMounted, ref} from "vue";
import MenuIcon from "vue-material-design-icons/Menu.vue";
import CloseIcon from "vue-material-design-icons/Close.vue";
import { useRoute } from "vue-router";
const useMealStore = useMeal();
const route = useRoute();
const isMenuClicked = ref(false);
const menuClassName = ref("fixed w-0 top-0 bottom-0 flex items-center justify-center -right-80 transition-all z-50 bg-stone-900");
const closeMenu = () => {
  isMenuClicked.value = false;
  menuClassName.value =
      "fixed w-0 top-0 bottom-0 flex items-center h-screen justify-center -right-80 transition-all z-50 bg-stone-900";
}
const menuClickHandler = () => {
  isMenuClicked.value = true;
  menuClassName.value =
      "fixed w-10/12 top-0 bottom-0 h-screen items-center justify-center right-0 transition-all z-50 bg-stone-900";
};

</script>

<template>
  <nav
    class="items-center flex flex-row px-4 md:px-8 backdrop-blur-lg py-4 mb-12 sticky top-0 border-b-rose-500 border-b-2 z-40"
  >
    <h4 class="text-2xl lg:text-3xl text-rose-700 font-bold">Shloot~Shloot</h4>
    <MenuIcon
      class="mr-2 text-rose-700 md:hidden ml-auto"
      @click="menuClickHandler"
    />
    <ul class="flex-row items-center gap-8 ml-auto hidden md:flex">
      <li
        class="text-rose-700 cursor-pointer"
        @click="Router.push('/')"
        :class="{ 'font-bold': route.path === '/' }"
        style="transition: all 300ms ease-in-out;"
      >
        Home
      </li>
      <li
        class="text-rose-700 cursor-pointer"
        @click="Router.push('/meals')"
        :class="{ 'font-bold': route.path === '/meals' }"
        style="transition: all 300ms ease-in-out;"
      >
        Meals
      </li>
      <li
        class="text-rose-700 cursor-pointer"
        @click="Router.push('/categories')"
        :class="{ 'font-bold': route.path === '/categories' }"
        style="transition: all 300ms ease-in-out;"
      >
        Categories
      </li>
      <li
        class="text-rose-700 relative cursor-pointer"
        @click="Router.push('/favorite')"
        :class="{ 'font-bold': route.path === '/favorite' }"
        style="transition: all 300ms ease-in-out;"
      >
        Favorite
        <span
          class="absolute -top-2 -right-3 bg-rose-700 text-stone-100 text-sm w-5 h-5 flex items-center justify-center rounded-full"
        >
          {{ useMealStore.favoriteMealsCount }}
        </span>
      </li>
    </ul>
  </nav>
      <div :class="menuClassName" style="transition: all 300ms ease-in-out">
        <button class="absolute top-5 right-5" @click="closeMenu">
          <CloseIcon size="30" class="text-rose-700"/>
        </button>
        <ul class="flex-col items-center justify-center py-24 space-y-6 text-center">
          <li
            class="text-rose-700 cursor-pointer flex-grow-0 flex-1 flex-shrink-0"
            @click="Router.push('/')"
            :class="{ 'font-bold': route.path === '/', 'hidden': !isMenuClicked }"
          >
            Home
          </li>
          <li
            class="text-rose-700 cursor-pointer"
            @click="Router.push('/meals')"
            :class="{ 'font-bold': route.path === '/meals', 'hidden': !isMenuClicked }"
          >
            Meals
          </li>
          <li
            class="text-rose-700 cursor-pointer"
            @click="Router.push('/categories')"
            :class="{ 'font-bold': route.path === '/categories', 'hidden': !isMenuClicked }"
          >
            Categories
          </li>
          <li
            class="text-rose-700 relative cursor-pointer"
            @click="Router.push('/favorite')"
            :class="{ 'font-bold': route.path === '/favorite', 'hidden': !isMenuClicked }"
          >
            Favorite
            <span
              class="absolute -top-2 -right-3 bg-rose-700 text-stone-100 text-sm w-5 h-5 flex items-center justify-center rounded-full"
            >
              {{ useMealStore.favoriteMealsCount }}
            </span>
          </li>
        </ul>
      </div>
</template>
