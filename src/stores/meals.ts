import {defineStore} from "pinia";
import type {Meal, MealCategory} from "@/types/types";
import {domainUrl, allCategoriesUrl} from "@/api"
import {useLoadingState} from "@/stores/loading";
import Loading, {useLoading} from 'vue-loading-overlay';

export const useMeal = defineStore("meal", {
    state: () => ({
        searchedMeals: <Meal[]>[],
        favoriteMeals: <Meal[]>[],
        searchMeal: "",
        mealDetails: <Meal>{},
        categories: <MealCategory[]>[],
    }),
    getters: {
        mealIngredients(state: any) {
            let ingredients: string[] = [];
            for(let i=1; i<=20; i++) {
                if(state.mealDetails[`strIngredient${i}`]) {
                    ingredients.push(state.mealDetails[`strIngredient${i}`]);
                }
            }
            return ingredients;
        },
        favoriteMealsCount(state: any) {
            return state.favoriteMeals.length;
        },
    },
    actions: {
        async getAllInfo() {
            if(this.searchedMeals.length !== 0) {
                this.searchedMeals = [];
            }
            const response = await fetch(`${domainUrl}/search.php?s=${this.searchMeal}`);
            const data = await response.json();
            this.searchedMeals = data.meals;
        },
        async getMealDetails(id: number) {
            const useLoadingStore = useLoadingState();
            useLoadingStore.isLoading = true;
            let loader = useLoadingStore.vueLoading.show();
            this.mealDetails = {};
            const response = await fetch(`${domainUrl}/lookup.php?i=${id}`);
            const data = await response.json();
            useLoadingStore.isLoading = false;
            loader.hide();
            if(data.meals) {
                this.mealDetails = data.meals[0];

            }
        },
        toggleFavorite(meal: Meal) {
            console.log(this.favoriteMeals);
            if(!this.isMealFavorite(meal)) {
                this.favoriteMeals.push(meal);
                console.log('already ffav');
            } else {
                this.favoriteMeals = this.favoriteMeals.filter((favMeal: Meal) => favMeal.idMeal !== meal.idMeal);
                console.log('not fav')
            }
        },
        isMealFavorite(meal: Meal) {
            return this.favoriteMeals.includes(meal);
        },
        async getCategories() {
            const response = await fetch(allCategoriesUrl);
            const data = await response.json();
            this.categories = data.categories;
        }
    },
})