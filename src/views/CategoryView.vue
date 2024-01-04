<script setup lang="ts">
import { useMeal } from '@/stores/meals';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import MainLayout from '@/components/MainLayout.vue';
import Divider from '@/components/Divider.vue';
import Button from '@/components/Button.vue';
const useMealStore = useMeal();
const { categories } = storeToRefs(useMealStore);
onMounted(() => {
  useMealStore.getCategories();
});
</script>

<template>
  <MainLayout>
    <div class="flex flex-col gap-2 w-full">
      <h4 class="text-2xl md:text-3xl font-semibold tracking-wide capitalize">
        Categories
      </h4>
      <Divider />
      <div
        v-for="(c, index) in categories"
        :key="index"
        class="flex flex-col mb-4 items-center transition-shadow md:flex-row md:items-start gap-4 bg-stone-100 shadow-md p-6 cursor-pointer hover:shadow-lg"
      >
        <img :src="c.strCategoryThumb" alt="" class="w-full md:w-3/12" />
        <div class="flex-1 flex flex-col gap-3">
          <h4 class="font-medium text-lg md:text-xl">{{ c.strCategory }}</h4>
          <p class="text-sm leading-6 md:text-base">
            {{ c.strCategoryDescription }}
          </p>
          <Button
            style-class="ml-auto bg-rose-600 flex items-center gap-2 mt-2 rounded-sm"
            @click="useMealStore.getAllMealsByCategory(c.strCategory)"
          >
            <template #text> Meals for {{ c.strCategory }} </template>
            <template #rightIcon>
              <i class="fa-solid fa-magnifying-glass text-lg"></i>
            </template>
          </Button>
        </div>
      </div>
    </div>
  </MainLayout>
</template>
