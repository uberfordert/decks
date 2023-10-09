<template>
  <div class="shopping-cart">
    <table
      v-if="useCartStore().cartList.list.length != 0"
      class="min-w-full text-center text-xl font-light"
    >
      <thead class="border-b font-medium dark:border-neutral-500">
        <tr>
          <th class="px-6 py-2 text-xl">#</th>
          <th class="px-6 py-2 text-xl">text</th>
          <th class="px-6 py-2 text-xl">color</th>
          <th class="px-6 py-2 text-xl">size</th>
          <th class="px-6 py-2"></th>
        </tr>
      </thead>
      <tbody class="border-b dark:border-neutral-500">
        <TransitionGroup>
          <tr v-for="shirt in useCartStore().cartList.list" :key="shirt.text">
            <th class="whitespace-nowrap px-6 py-2 font-medium">1</th>
            <th class="whitespace-nowrap px-6 py-2">"{{ shirt.text }}"</th>
            <th class="whitespace-nowrap px-6 py-2">{{ shirt.color }}</th>
            <th class="whitespace-nowrap px-6 py-2">{{ shirt.size }}</th>
            <th class="whitespace-nowrap px-6 py-2">
              <button :disabled="isButtonDisabled" @click="deleteShirt(shirt)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z"
                  />
                </svg>
              </button>
            </th>
          </tr>
        </TransitionGroup>
      </tbody>
    </table>
    <div
      v-if="useCartStore().cartList.list.length != 0"
      class="text-end mx-6 my-4 underline text-xl"
    >
      subtotal: {{ useCartStore().totalPrice.amount }} €
    </div>
    <Transition>
      <div
        class="mx-6 my-6 text-xl"
        v-if="useItemVisibilityStore().isEditSizeVisible == true"
      >
        <h2 class="animate-bounce">edit shirt</h2>
        <table class="min-w-full text-center text-xl font-light">
          <tbody class="border-t dark:border-neutral-500">
            <tr>
              <th class="whitespace-nowrap px-6 py-2">
                <p class="">"{{ useCartStore().tempCartItem.text }}"</p>
              </th>
              <th class="whitespace-nowrap px-6 py-2">
                <p class="">
                  {{ useCartStore().tempCartItem.color }}
                </p>
              </th>
              <th class="whitespace-nowrap px-6 py-2">
                <select
                  class="rounded-md flex-none text-sm"
                  name="size"
                  v-model="useCartStore().tempCartItem.size"
                >
                  <option class="text-inherit" value="XS">XS</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                </select>
              </th>
              <th class="whitespace-nowrap px-6 py-2">
                <button
                  v-if="useItemVisibilityStore().isEditSizeVisible"
                  @click="addItemToCart"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </Transition>
  </div>
</template>
<script setup>
import { reactive, ref, watch } from "vue";
import { useCartStore } from "../store/cart.js";
import { useItemVisibilityStore } from "../store/itemVisibility.js";
import { Motion } from "motion/vue";
import { useErrorStore } from "../store/error.js";

const SHIRT_PRICE = 25.0;
const isButtonDisabled = ref(false);

const addItemToCart = () => {
  if (
    useCartStore().tempCartItem.color !== "" &&
    useCartStore().tempCartItem.size !== "" &&
    useCartStore().tempCartItem.text !== ""
  ) {
    const tempShirtRef = {
      color: useCartStore().tempCartItem.color,
      size: useCartStore().tempCartItem.size,
      text: useCartStore().tempCartItem.text,
    };
    useCartStore().addCartItem(tempShirtRef);
    useCartStore().totalPrice.amount += SHIRT_PRICE;
    console.log(useCartStore().cartList.list);
    useItemVisibilityStore().isEditSizeVisible = false;
  } else if (useCartStore().tempCartItem.size === "") {
    console.log("text or size empty");
    useErrorStore().show = true;
    useErrorStore().message = "choose a size";
    setTimeout(() => {
      useErrorStore().show = false;
      useErrorStore().message = "";
    }, 2000);
  }
};

const deleteShirt = (shirt) => {
  useCartStore().cartList.list = useCartStore().cartList.list.filter(
    (t) => t !== shirt
  );
  useCartStore().totalPrice.amount -= SHIRT_PRICE;
  isButtonDisabled.value = true;
};
//Todo: try to change logic by only using the store
</script>

<style scoped>
.v-enter-active {
  animation: fadeIn 750ms;
}
.v-leave-active {
  animation: fadeIn 750ms reverse;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
