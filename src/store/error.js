import { defineStore } from "pinia";
import { reactive } from "vue";

export const useErrorStore = defineStore("erro", () => {
  const error = reactive({
    show: false,
    message: "",
  });
  return {
    error,
  };
});
