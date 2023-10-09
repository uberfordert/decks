import { defineStore } from "pinia";
import { reactive } from "vue";

export const useItemVisibilityStore = defineStore("itemVisibility", () => {
  const isEditSizeVisible = reactive({
    value: false,
  });

  const isAddItemToCartButtonVisible = reactive({
    value: false,
  });

  const getIsAddItemToCartButtonVisible = () => {
    return isAddItemToCartButtonVisible;
  };

  return {
    isEditSizeVisible,
    isAddItemToCartButtonVisible,
    getIsAddItemToCartButtonVisible,
  };
});
