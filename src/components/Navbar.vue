<script setup lang="ts">
import Router from '@/router';
import { useMeal } from '@/stores/meals';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import MobileNavbar from '@/components/MobileNavbar.vue';
import type { routeItems } from '@/types/types';
import { gsap } from 'gsap';
import { storeToRefs } from 'pinia';
// @ts-ignore
import { useI18n } from 'vue-i18n';

const useMealStore = useMeal();
const { searchMeal, favoriteMealsCount } = storeToRefs(useMealStore);
const route = useRoute();
const isMenuClicked = ref(false);
const fav = ref(null);
const { t, locale, availableLocales } = useI18n();
const closeMenu = () => {
  isMenuClicked.value = false;
};
const openMenu = () => {
  isMenuClicked.value = true;
};
const navbarItems: routeItems[] = [
  {
    name: 'home',
    path: '/',
    hasBadge: false,
  },
  {
    name: 'meals',
    path: '/meals',
    hasBadge: false,
  },
  {
    name: 'categories',
    path: '/categories',
    hasBadge: false,
  },
];
watch(favoriteMealsCount, () => {
  gsap.fromTo(
    fav.value,
    {
      rotate: -12,
      duration: 0.2,
      yoyo: true,
    },
    {
      duration: 0.2,
      yoyo: true,
      repeat: 2,
      rotate: 12,
      scale: 1.125,
      onComplete: () => {
        gsap.to(fav.value, {
          rotate: 0,
          duration: 0.1,
          scale: 1,
        });
      },
    }
  );
});
</script>

<template>
  <nav
    class="items-center w-full bg-stone-100 mx-auto flex flex-row px-4 py-6 md:py-8 mb-4 sticky top-0 backdrop-blur-xl z-30"
  >
    <h4 class="text-2xl lg:text-3xl italic text-rose-600 font-bold mr-auto">
      Shloot~Shloot
    </h4>
    <ul class="flex-row items-center gap-8 hidden ml-auto md:flex">
      <li
        v-for="link in navbarItems"
        :key="link.path"
        class="cursor-pointer relative group nav-link py-2"
        @click="Router.push(link.path)"
        :class="{
          'font-semibold': route.path === link.path,
          relative: link.hasBadge,
        }"
        style="transition: all 300ms ease-in-out"
      >
        {{ t(`Navbar.${link.name}`) }}
        <span
          class="absolute bottom-1 left-0 w-0 h-[3px] bg-red-600 duration-300 group-hover:w-full group-hover:transition-all"
        >
        </span>
        <span
          v-if="link.hasBadge"
          class="absolute nav-link -top-2 -right-3 bg-rose-700 text-stone-100 text-sm w-5 h-5 flex items-center justify-center rounded-full"
        >
          {{ useMealStore.favoriteMealsCount }}
        </span>
      </li>
    </ul>
    <button
      ref="fav"
      class="flex relative items-center justify-center mt-1 md:mx-8 mb-1.5"
      @click="Router.push('/favorite')"
    >
      <i class="fa-solid text-rose-600 fa-utensils text-xl"></i>
      <span
        class="absolute -top-[6px] -right-3 bg-rose-600 text-stone-100 text-xs w-4 h-4 flex items-center justify-center rounded-full"
      >
        {{ favoriteMealsCount }}
      </span>
    </button>
    <!-- <div
      v-if="route.path === '/meals'"
      class="hidden md:flex items-center border-stone-900 rounded-sm overflow-hidden border-[1px]"
    >
      <input
        type="text"
        placeholder="Search meals by name"
        v-model="searchMeal"
        @keydown.enter="useMealStore.getAllInfo()"
        class="py-2 px-4 rounded-md bg-stone-50 border-none placeholder:text-stone-700 w-auto md:w-64 focus:outline-0 focus:ring-0"
      />
      <button class="py-2 px-4 bg-stone-50" @click="useMealStore.getAllInfo()">
        <i class="fa-solid text-rose-600 fa-magnifying-glass"></i>
      </button>
    </div> -->

    <i
      class="fa-solid text-xl fa-bars md:mr-2 ml-8 md:hidden cursor-pointer"
      @click="openMenu"
    ></i>
    <!-- <select v-model="locale"
            class="py-1 ml-8 px-1.5 bg-stone-50 border-stone-950 border-[1px] focus:ring-0 focus:outline-0 text-rose-700"
    >
      <option v-for="locale in availableLocales" :value="locale" :key="locale">{{ locale }}</option>
    </select> -->
  </nav>
  <MobileNavbar
    :close-menu="closeMenu"
    :is-menu-clicked="isMenuClicked"
    :navbar-items="navbarItems"
  />
</template>

<style scoped>
.nav-link-bar {
  position: absolute;
  left: 0;
  width: 0;
  bottom: 3px;
  height: 3px;
  background-color: red;
}

.nav-link:hover .nav-link-bar,
.active-nav-link {
  width: 100%;
  transition: all 1000ms ease-in-out;
}
</style>
