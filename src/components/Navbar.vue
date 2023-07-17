<script setup lang="ts">
import Router from "@/router";
import {useMeal} from "@/stores/meals";
import {ref, watch} from "vue";
import {useRoute} from "vue-router";
import MobileNavbar from "@/components/MobileNavbar.vue";
import type {routeItems} from "@/types/types";
import {gsap} from "gsap";
import {storeToRefs} from "pinia";
// @ts-ignore
import {useI18n} from "vue-i18n";

const useMealStore = useMeal();
const {searchMeal, favoriteMealsCount} = storeToRefs(useMealStore);
const route = useRoute();
const isMenuClicked = ref(false);
const fav = ref(null);
const {t, locale, availableLocales} = useI18n();
const closeMenu = () => {
  isMenuClicked.value = false;
};
const openMenu = () => {
  isMenuClicked.value = true;
};
const navbarItems: routeItems[] = [
  {
    name: 'home',
    path: "/",
    hasBadge: false,
  },
  {
    name: 'meals',
    path: "/meals",
    hasBadge: false,
  },
  {
    name: "categories",
    path: "/categories",
    hasBadge: false,
  },
];
watch(favoriteMealsCount, () => {
  gsap.fromTo(fav.value, {
    rotate: -12,
    duration: .2,
    yoyo: true,
  }, {
    duration: .2,
    yoyo: true,
    repeat: 2,
    rotate: 12,
    scale: 1.125,
    onComplete: () => {
      gsap.to(fav.value, {
        rotate: 0,
        duration: .1,
        scale: 1,
      });
    }
  })
})

</script>

<template>
  <nav
      class="items-center flex flex-row px-4 md:px-8 backdrop-blur-xl py-4 mb-8 md:mb-12 sticky top-0 border-b-rose-500 border-b-2 z-30"
  >
    <h4 class="text-2xl lg:text-3xl text-rose-700 font-bold mr-auto">Shloot~Shloot</h4>
    <div v-if="route.path === '/meals'" class="hidden md:flex items-center ml-auto border-stone-950 border-[1px]">
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
    </div>
    <button ref="fav"
            class="flex relative items-center justify-center ml-auto md:ml-8 mt-1 mb-1.5 text-rose-700"
            @click="Router.push('/favorite')"
    >
      <i class="fa-solid fa-utensils text-xl"></i>
      <span
          class="absolute -top-[6px] -right-3 bg-rose-700 text-stone-100 text-xs w-4 h-4 flex items-center justify-center rounded-full"
      >
        {{ favoriteMealsCount }}
      </span>
    </button>
    <ul class="flex-row items-center gap-8 ml-8 hidden md:flex">
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
        {{ t(`Navbar.${link.name}`) }}
        <span
            v-if="link.hasBadge"
            class="absolute -top-2 -right-3 bg-rose-700 text-stone-100 text-sm w-5 h-5 flex items-center justify-center rounded-full"
        >
          {{ useMealStore.favoriteMealsCount }}
        </span>
      </li>
    </ul>

    <i
        class="fa-solid text-xl fa-bars mr-2 text-rose-700 ml-8 md:hidden cursor-pointer"
        @click="openMenu"
    ></i>
    <select v-model="locale"
            class="py-1 ml-8 px-1.5 bg-stone-50 border-stone-950 border-[1px] focus:ring-0 focus:outline-0 text-rose-700"
    >
      <option v-for="locale in availableLocales" :value="locale" :key="locale">{{ locale }}</option>
    </select>
  </nav>
  <MobileNavbar
      :close-menu="closeMenu"
      :is-menu-clicked="isMenuClicked"
      :navbar-items="navbarItems"
  />
</template>
