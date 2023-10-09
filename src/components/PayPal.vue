<template>
  <div
    v-if="
      !usePaypalStore().succesfulPurchase && useCartStore().cartList.list.length
    "
    class="mx-6 my-6 items-center"
  >
    <PayPalButton :amount="amount" />
    <div v-if="usePaypalStore().succesfulPurchase">Kauf abgeschlossen</div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useCartStore } from "../store/cart";
import { usePaypalStore } from "../store/paypal";
import PayPalButton from "./PayPalButton.vue";

//Todo: find a way to clean this up,
//it works but is very scuffed
const amount = ref(useCartStore().totalPrice.amount);

onMounted(() => {
  usePaypalStore().succesfulPurchase = false;
});
</script>
