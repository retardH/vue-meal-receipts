import {defineStore} from "pinia";
import type {Meal, MealCategory} from "@/types/types";
import {domainUrl, allCategoriesUrl} from "@/api"
import {useLoadingState} from "@/stores/loading";
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
            if (state.selectedIngredient.includes('_')) {
                return state.selectedIngredient.split('_').join(' ');
            }
            return state.selectedIngredient;
        }
    },
    actions: {
        async getAllInfo() {
            const useLoadingStore = useLoadingState();
            let loader = useLoadingStore.initializeLoading();
            this.searchedMeals = [];
            try {
                let response;
                if (this.searchMeal.length === 1) {
                    response = await fetch(`${domainUrl}/search.php?f=${this.searchMeal.toLowerCase()}`);
                } else {
                    response = await fetch(`${domainUrl}/search.php?s=${this.searchMeal}`);
                }
                const data = await response.json();
                useLoadingStore.isLoading = false;
                loader.hide();
                this.searchedMeals = data.meals;
                this.resultText = `${this.searchedMeals.length} ${this.searchedMeals.length > 1 ? "Results" : "Result"} found for '${this.searchMeal}'`;
                console.log(this.resultText);
                this.searchMeal = "";
            } catch (error) {
                console.log(error);
                this.resultText = `No Result Found!`
            }
        },
        async getAllMealsByCategory(category: string) {
            this.searchedMeals = [];
            const response = await fetch(`${domainUrl}/filter.php?c=${category}`);
            const data = await response.json();
            if (data.meals) {
                this.searchedMeals = data.meals;
                await Router.push('/meals');
            }
            this.resultText = `CATEGORY ~ ${category}:`;

        },
        async getMealDetails(id: number) {
            const useLoadingStore = useLoadingState();
            let loader = useLoadingStore.initializeLoading();
            this.mealDetails = {};
            const response = await fetch(`${domainUrl}/lookup.php?i=${id}`);
            const data = await response.json();
            useLoadingStore.isLoading = false;
            loader.hide();
            if (data.meals) {
                this.mealDetails = data.meals[0];

            }
        },
        toggleFavorite(meal: Meal) {
            if (!this.isMealFavorite(meal)) {
                this.favoriteMeals.push(meal);
            } else {
                this.favoriteMeals = this.favoriteMeals.filter((favMeal: Meal) => favMeal.idMeal !== meal.idMeal);
            }
        },
        isMealFavorite(meal: Meal) {
            return this.favoriteMeals.includes(meal);
        },
        async getCategories() {
            const response = await fetch(allCategoriesUrl);
            const data = await response.json();
            this.categories = data.categories;
        },
        async getMealsByCountry() {
            const useLoadingStore = useLoadingState();
            let loader = useLoadingStore.initializeLoading();
            this.searchedMeals = [];
            const response = await fetch(`${domainUrl}/filter.php?a=${this.selectedCountry}`);
            const data = await response.json();
            useLoadingStore.isLoading = false;
            loader.hide();
            this.searchedMeals = data.meals;
            this.resultText = `${this.selectedCountry} Foods:`;
            this.selectedCountry = "";
        },
        async getMealsByIngredient() {
            const useLoadingStore = useLoadingState();
            const loader = useLoadingStore.initializeLoading();
            const response = await fetch(`${domainUrl}/filter.php?i=${this.selectedIngredient}`);
            const data = await response.json();
            useLoadingStore.isLoading = false;
            loader.hide();
            this.searchedMeals = data.meals;
            this.resultText = `Meals with ${this.formatSelectedIngredient} as Main Ingredient:`;
        },
        async getAllList() {
            const response = await fetch(`${domainUrl}/list.php?a=list`);
            const data = await response.json();
            this.allAreas = data.meals;
        }
    },
})