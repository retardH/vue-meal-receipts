import { defineStore } from "pinia";
import type { Meal, MealCategory } from "@/types/types";
import { axiosInstance } from "@/api";
import { useLoadingState } from "@/stores/loading";
import Router from "@/router";

export const useMeal = defineStore("meal", {
  state: () => ({
    searchedMeals: <Meal[]>[],
    favoriteMeals: <Meal[]>[],
    searchMeal: "",
    mealDetails: <Meal>{},
    categories: <MealCategory[]>[],
    selectedCountry: "American",
    allAreas: [] as { strArea: string }[],
    resultText: "",
    selectedIngredient: "",
  }),
  getters: {
    mealIngredients(state: any) {
      let ingredients: string[] = [];
      for (let i = 1; i <= 20; i++) {
        if (state.mealDetails[`strIngredient${i}`]) {
          ingredients.push(state.mealDetails[`strIngredient${i}`]);
        }
      }
      return ingredients;
    },
    favoriteMealsCount(state: any) {
      return state.favoriteMeals.length;
    },
    carouselMeals(state: any) {
      return state.searchedMeals.slice(0, 10);
    },
    formatSelectedIngredient(state: any) {
      if (state.selectedIngredient.includes("_")) {
        return state.selectedIngredient.split("_").join(" ");
      }
      return state.selectedIngredient;
    },
  },
  actions: {
    async getAllInfo() {
      const useLoadingStore = useLoadingState();
      let loader = useLoadingStore.initializeLoading();
      this.searchedMeals = [];
      try {
        let response;
        if (this.searchMeal.length === 1) {
          response = await axiosInstance.get(
            `/search.php?f=${this.searchMeal.toLowerCase()}`
          );
        } else {
          response = await axiosInstance.get(
            `/search.php?s=${this.searchMeal}`
          );
        }
        const data = await response.data;
        useLoadingStore.isLoading = false;
        loader.hide();
        this.searchedMeals = data.meals;
        this.resultText = `${this.searchedMeals.length} ${
          this.searchedMeals.length > 1 ? "Results" : "Result"
        } found for '${this.searchMeal}'`;
      } catch (error) {
        console.log(error);
        this.resultText = `No Result Found!`;
      }
      this.searchMeal = "";
    },
    async getAllMealsByCategory(category: string) {
      this.searchedMeals = [];
      const useLoadingStore = useLoadingState();
      let loader = useLoadingStore.initializeLoading();
      const response = await axiosInstance.get(`/filter.php?c=${category}`);
      const data = await response.data;
      if (data.meals) {
        this.searchedMeals = data.meals;
        await Router.push("/meals");
      }
      useLoadingStore.isLoading = false;
      loader.hide();
      this.resultText = `CATEGORY ~ ${category}:`;
    },
    async getMealDetails(id: number) {
      const useLoadingStore = useLoadingState();
      let loader = useLoadingStore.initializeLoading();
      this.mealDetails = {};
      try {
        const response = await axiosInstance.get(`/lookup.php?i=${id}`);
        const data = await response.data;
        useLoadingStore.isLoading = false;
        loader.hide();
        if (data.meals) {
          this.mealDetails = data.meals[0];
        }
      } catch (error) {
        console.log(error);
      }
    },
    toggleFavorite(meal: Meal) {
      if (!this.isMealFavorite(meal)) {
        this.favoriteMeals.push(meal);
        localStorage.setItem("favoriteMeals", JSON.stringify(this.favoriteMeals));
      } else {
        this.favoriteMeals = this.favoriteMeals.filter(
          (favMeal: Meal) => favMeal.idMeal !== meal.idMeal
        );
        localStorage.setItem("favoriteMeals", JSON.stringify(this.favoriteMeals));
      }
    },
    isMealFavorite(meal: Meal) {
      return this.favoriteMeals.includes(meal);
    },
    async getCategories() {
      let data;
      try {
        if (this.categories.length === 0) {
          const useLoadingStore = useLoadingState();
          let loader = useLoadingStore.initializeLoading();
          const response = await axiosInstance.get(`/categories.php`);
          data = await response.data;
          useLoadingStore.isLoading = false;
          loader.hide();
          this.categories = data.categories;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getMealsByCountry() {
      const useLoadingStore = useLoadingState();
      let loader = useLoadingStore.initializeLoading();
      this.searchedMeals = [];
      try {
        const response = await axiosInstance.get(
            `/filter.php?a=${this.selectedCountry}`
        );
        const data = await response.data;
        useLoadingStore.isLoading = false;
        loader.hide();
        this.searchedMeals = data.meals;
        this.resultText = `${this.selectedCountry} Foods:`;
        this.selectedCountry = "";
      } catch (error) {
        console.log(error);
      }
    },
    async getMealsByIngredient() {
      const useLoadingStore = useLoadingState();
      const loader = useLoadingStore.initializeLoading();
      try {
        const response = await axiosInstance.get(
            `/filter.php?i=${this.selectedIngredient}`
        );
        const data = await response.data;
        useLoadingStore.isLoading = false;
        loader.hide();
        this.searchedMeals = data.meals;
        this.resultText = `Meals with ${this.formatSelectedIngredient} as Main Ingredient:`;
      } catch (error) {
        console.log(error);
      }
    },
    async getAllList() {
      const response = await axiosInstance.get(`/list.php?a=list`);
      const data = await response.data;
      this.allAreas = data.meals;
    },
  },
});
