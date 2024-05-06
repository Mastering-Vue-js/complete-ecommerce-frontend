//create home component
<script setup>
import { authStore } from "../../store/store";
import { cart } from "../../store/cart";
const auth = authStore;
</script>
<template>
  <section class="mt-[40px] text-white p-5">
    <p class="pb-5">Admin</p>
    <ul class="flex flex-col space-y-5">
      <li>
        <router-link to="/admin">Home</router-link>
      </li>
      <li>
        <router-link to="/admin/products">Products</router-link>
      </li>
      <li>
        <router-link to="/admin/categories">Categories</router-link>
      </li>
      <!-- <li v-if="auth.isAuthenticated">
        <router-link to="/orders">Orders </router-link>
      </li> -->
    </ul>
  </section>
</template>

<style></style>