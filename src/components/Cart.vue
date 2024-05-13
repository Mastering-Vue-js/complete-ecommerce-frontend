<script setup>
import { cart } from "../store/cart";
</script>

<template>
  <div class="bg-white">
    <div class="mx-auto px-12 py-8">
      <h2 class="text-2xl font-bold tracking-tight text-gray-900">Cart</h2>
      <div>
        <div class="flex items-center my-5" v-for="(item, index) in cart.items" :key="index">
          <slot v-if="item != undefined && item.hasOwnProperty('product')">
            <p class="w-2/3">
              <router-link :to="`/products/${item.product.id}`">
                {{ item.product.name }}
              </router-link>
            </p>
            <p class="w-[100px]">${{ item.product.price }}</p>
            <p class="flex">
              <button @click="cart.updateCart('minus', item, index)" class="ml-2 mr-2 pointer bg-gray-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">-</button>
              <input class="w-[50px]" type="number" v-model="item.quantity" />
              <button @click="cart.updateCart('plus', item, index)" class="ml-2 pointer bg-gray-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">+</button>
            </p>
            <button @click="cart.deleteCartItem(item, index)"
              class="ml-5 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Delete
            </button>
          </slot>
        </div>

        <div class="flex items-center my-5">
          <p class="w-2/3">Total</p>
          <p class="w-[100px]"></p>
          <p>
            <strong>${{ cart.totalPrice }}</strong>
          </p>
        </div>
<!-- 
        <button @click="cart.checkout()"
          class="ml-5 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Checkout
        </button> -->
        <router-link class="ml-5 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" to="/checkout">Checkout</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped></style>