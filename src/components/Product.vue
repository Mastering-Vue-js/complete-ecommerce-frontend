//create home component
<script setup>
import { useRoute } from "vue-router";
import { ref, reactive, onBeforeMount } from "vue";
import { cart } from "../store/cart";
import { authStore } from "../store/store";
import { data } from "../store/data";
const route = useRoute();
const id = route.params.id;
// const product = reactive({});
const product = ref(null);
const comments = ref([]);
onBeforeMount(() => {
  const res = data.fetchPublicApi(`/api/products/${id}`, {}, "GET");
  res.then((response) => {
    product.value = response.data;
  });
});
</script>
<template>
  <article class="mb-10" v-if="product != null">
    <h1 class="text-xl mb-2">
      {{ product.name }}
    </h1>
    <img class="w-60" :src="authStore.apiBase + '/' + product.image" alt="" />
    <p> Category: {{ product.category.name }} </p>
    <p>{{ product.description }}</p>
    <p>Price: ${{ product.price }}</p>
    <p>
      <button
        @click="cart.addItem(product)"
        class="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add To Cart
      </button>
    </p>
  </article>
</template>

<style></style>