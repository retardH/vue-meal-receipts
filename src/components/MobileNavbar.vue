<script setup lang="ts">
import Router from "@/router";
import { useRoute } from "vue-router";
import { useMeal } from "@/stores/meals";
import type { routeItems } from "@/types/types";
const route = useRoute();
const useMealStore = useMeal();
defineProps<{
  menuClassName: string;
  closeMenu: () => void;
  isMenuClicked: boolean;
  navbarItems: routeItems[];
}>();
</script>

<template>
  <div :class="menuClassName" style="transition: all 300ms ease-in-out">
    <div
      class="flex-col flex items-center justify-center py-24 space-y-6 text-center"
    >
      <a
        v-for="link in navbarItems"
        :key="link.path"
        class="text-stone-100 cursor-pointer text-lg opacity-100"
        @click="Router.push(link.path)"
        :class="{
          'font-bold': route.path === link.path,
          relative: link.hasBadge,
          hidden: !isMenuClicked,
        }"
        style="transition: all 300ms ease"
      >
        {{ link.name }}
        <span
          v-if="link.hasBadge"
          class="absolute -top-2 -right-3 bg-rose-700 text-stone-100 text-sm w-5 h-5 flex items-center justify-center rounded-full"
        >
          {{ useMealStore.favoriteMealsCount }}
        </span>
      </a>
    </div>
    <button class="absolute z-50 w-12 h-12 top-5 right-5" @click="closeMenu">
      <i class="fa-solid fa-xmark text-xl text-stone-100"></i>
    </button>
  </div>
</template>
