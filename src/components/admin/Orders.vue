<script setup>
import { onBeforeMount, ref } from "vue";
import { order } from "../../store/order";
import { data } from "../../store/data";

onBeforeMount(() => {
  order.fetchAdminOrders();
});

const toggleOrderId = ref(null);

const calculateTotal = (products) => {
  return products.reduce((acc, product) => acc + product.price * product.pivot.quantity, 0);
};

</script>

<template>
  <div class="bg-white">
    <div class="mx-auto px-12 py-8">
      <h2 class="text-2xl font-bold tracking-tight text-gray-900">Orders</h2>
      <p class="my-10"></p>
    </div>
    <div class="px-12 py-8">
      <!-- <p>{{ order.orders }}</p> -->
      <div class="my-2" v-for="order in order.orders" :key="order.id">
        <div class="order-info flex justify-between w-full">
          <p class="w-1/3"><strong>Order ID:</strong> {{ order.id }}</p>
          <p class="w-1/3" v-if="order.coupon != null"><strong>Coupon:</strong> {{ order.coupon }}</p>
          <p class="w-1/3"><strong>Total Amount:</strong> ${{ order.total }}</p>
          <!-- <p class="w-1/3"><strong>Address:</strong> Name: {{ order.name }}, Phone: {{ order.phone }}, Email: {{
        order.email }}</p> -->
          <p class="w-1/3"><strong>Customer:</strong> {{ order.user.name }}</p>
          <p class="w-1/3"><strong>Payment Method:</strong> {{ order.payment_method }}</p>
          <p class="w-1/3"><strong>Status:</strong> {{ data.ucFirst(order.status) }}</p>
          <p class="w-1/3"><strong>Note:</strong> {{ order.notes }}</p>
          <p class="text-right w-1/3">
            <router-link :to="`/admin/orders/${order.id}`"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit</router-link>
          </p>
          <p class="text-right w-1/3">
            <button @click="toggleOrderId = order.id"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Show products
            </button>
          </p>
          <hr />
        </div>
        <div class="border my-5 p-5" v-if="toggleOrderId == order.id">
          <div class="flex items-center my-3" v-for="product in order.products" :key="product.id">
            <router-link class="w-2/3" :to="`/products/${product.id}`">{{ product.name }}</router-link>
            <p class="w-[100px]">${{ product.price }}</p>
            <p>Quantity: {{ product.pivot.quantity }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>