import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MealsView from "@/views/MealsView.vue";
import MealsDetailView from  "@/views/MealDetailView.vue";
import FavoriteMeals from "@/views/FavoriteMealsView.vue";
import CategoryView from "@/views/CategoryView.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/meals',
      name: 'meals',
      component: MealsView,
    },
    {
      path: '/meal/:id',
      name: 'meal-detail',
      component: MealsDetailView,
    },
    {
      path: '/favorite',
      name: 'favorite-meals',
      component: FavoriteMeals,
    },
    {
      path: '/categories',
      name: 'categories',
      component: CategoryView,
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
})

export default router
