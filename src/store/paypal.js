import { defineStore } from "pinia";
import { reactive } from "vue";

export const usePaypalStore = defineStore("paypal", () => {
  const succesfulPurchase = reactive({
    value: false,
  });
  const details = reactive({});
  return {
    succesfulPurchase,
  };
});
