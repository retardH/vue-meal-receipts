<script setup lang="ts">
import {useMeal} from "@/stores/meals";
import {storeToRefs} from "pinia";
import {onMounted} from "vue";
import MainLayout from "@/components/MainLayout.vue";
import Divider from "@/components/Divider.vue";
import Button from "@/components/Button.vue";
const useMealStore = useMeal();
const {categories} = storeToRefs(useMealStore);
onMounted(() => {
  useMealStore.getCategories();
})
</script>

<template>
  <MainLayout>
    <div class="flex flex-col gap-2 w-full">
      <h4 class="text-2xl md:text-3xl text-rose-700 font-bold uppercase">~Categories</h4>
      <Divider/>
      <div v-for="(c, index) in categories" :key="index"
           class="flex flex-col mb-4 items-center md:flex-row md:items-start gap-4 bg-stone-100 shadow-md p-6 cursor-pointer hover:shadow-lg"
      >
        <img :src="c.strCategoryThumb" alt=""/>
        <div class="flex-1 flex flex-col gap-3">
          <h4 class="font-bold text-2xl text-rose-700">{{c.strCategory}}</h4>
          <p class="text-lg text-rose-700">{{ c.strCategoryDescription }}</p>
          <Button style-class="ml-auto bg-rose-700 flex items-center gap-2 mt-2 rounded-sm"
                  @click="useMealStore.getAllMealsByCategory(c.strCategory)"
          >
            <template #text>
              Meals for {{c.strCategory}}
            </template>
            <template #rightIcon>
              <i class="fa-solid fa-magnifying-glass text-lg"></i>
            </template>
          </Button>
        </div>
      </div>
    </div>
  </MainLayout>
</template>