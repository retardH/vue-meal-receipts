import { defineStore } from "pinia";
import { useLoading } from "vue-loading-overlay";

export const useLoadingState = defineStore("loading", {
  state: () => ({
    isLoading: false,
  }),
  getters: {
    vueLoading(state) {
      return useLoading({
        active: state.isLoading,
        isFullPage: true,
        loader: "dots",
      });
    },
  },
  actions: {
    initializeLoading() {
      this.isLoading = true;
      return this.vueLoading.show();
    },
    stopLoading() {
      let loader = this.initializeLoading();
      this.isLoading = false;
      loader.hide();
    },
  },
});
