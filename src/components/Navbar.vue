<script setup lang="ts">
import Router from "@/router";
import { useMeal } from "@/stores/meals";
import { ref } from "vue";
import { useRoute } from "vue-router";
import MobileNavbar from "@/components/MobileNavbar.vue";
import type { routeItems } from "@/types/types";
import { storeToRefs } from "pinia";
const useMealStore = useMeal();
const { searchMeal } = storeToRefs(useMealStore);
const route = useRoute();
const isMenuClicked = ref(false);
const menuClassName = ref(
  "fixed w-0 top-0 bottom-0 flex items-center justify-center -right-80 transition-all z-40 bg-stone-900"
);
const closeMenu = () => {
  isMenuClicked.value = false;
  menuClassName.value =
    "fixed w-0 top-0 bottom-0 flex items-center h-screen justify-center -right-80 transition-all z-40 bg-stone-900";
};
const menuClickHandler = () => {
  isMenuClicked.value = true;
  menuClassName.value =
    "fixed w-10/12 top-0 bottom-0 h-screen items-center justify-center right-0 transition-all z-40 bg-stone-900";
};
const navbarItems: routeItems[] = [
  {
    name: "Home",
    path: "/",
    hasBadge: false,
  },
  {
    name: "Meals",
    path: "/meals",
    hasBadge: false,
  },
  {
    name: "Categories",
    path: "/categories",
    hasBadge: false,
  },
];
</script>

<template>
  <nav
    class="items-center flex flex-row px-4 md:px-8 backdrop-blur-xl py-4 mb-8 md:mb-12 sticky top-0 border-b-rose-500 border-b-2 z-30"
  >
    <h4 class="text-2xl lg:text-3xl text-rose-700 font-bold">Shloot~Shloot</h4>
    <!-- <div class="flex items-center ml-auto border-stone-950 border-2">
      <input
        type="text"
        placeholder="Search receipts..."
        v-model="searchMeal"
        @keydown.enter="useMealStore.getAllInfo()"
        class="py-2 px-4 rounded-sm bg-stone-50 text-rose-700 placeholder-rose-700 w-auto md:w-64 focus:outline-0 focus:ring-0"
      />
      <button class="py-2 px-4 bg-stone-50" @click="useMealStore.getAllInfo()">
        <i class="fa-solid fa-magnifying-glass"></i>
      </button>
    </div> -->
    <i
      class="fa-solid text-xl fa-bars mr-2 text-rose-700 md:hidden ml-auto cursor-pointer"
      @click="menuClickHandler"
    ></i>
    <ul class="flex-row items-center gap-8 ml-auto hidden md:flex">
      <li
        v-for="link in navbarItems"
        :key="link.path"
        class="text-rose-700 cursor-pointer"
        @click="Router.push(link.path)"
        :class="{
          'font-bold': route.path === link.path,
          relative: link.hasBadge,
        }"
        style="transition: all 300ms ease-in-out"
      >
        {{ link.name }}
        <span
          v-if="link.hasBadge"
          class="absolute -top-2 -right-3 bg-rose-700 text-stone-100 text-sm w-5 h-5 flex items-center justify-center rounded-full"
        >
          {{ useMealStore.favoriteMealsCount }}
        </span>
      </li>
    </ul>
    <button
      class="flex relative items-center justify-center ml-4 mt-1 md:ml-8 mb-1.5 text-rose-700"
      @click="Router.push('/favorite')"
    >
      <!-- <FoodIcon :size="30" /> -->
      <i class="fa-solid fa-bowl-food text-xl"></i>
      <span
        class="absolute -top-2 -right-3 bg-rose-700 text-stone-100 text-sm w-5 h-5 flex items-center justify-center rounded-full"
      >
        {{ useMealStore.favoriteMealsCount }}
      </span>
    </button>
  </nav>
  <MobileNavbar
    :menu-class-name="menuClassName"
    :close-menu="closeMenu"
    :is-menu-clicked="isMenuClicked"
    :navbar-items="navbarItems"
  />
</template>
