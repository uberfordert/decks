<script setup>
//TODO: add tailwind to project
import { reactive } from "vue";
import Footer from "./components/Footer.vue";
import Shirt from "./components/Shirt.vue";
import ShoppingCart from "./components/ShoppingCart.vue";
import PayPal from "./components/PayPal.vue";
import Header from "./components/Header.vue";

const products = reactive({
  list: [],
});
</script>

<template>
  <div style="">
    <Header></Header>
    <ShoppingCart></ShoppingCart>
    <Shirt></Shirt>
    <div class="">
      <PayPal></PayPal>
    </div>
  </div>
</template>
