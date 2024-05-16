<script setup>
import { ref, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { authStore } from '../../store/store';
import { data } from '../../store/data';

const route = useRoute();
const router = useRouter();
const orderID = route.params.id;

const orderData = ref(null);
const orderStatus = [
    'pending',
    'processing',
    'shipped',
    'delivered',
    'cancelled'
];

const getSingleOrder = () => {
    const res = data.fetchProtectedApi('/api/admin/orders/' + orderID, {}, 'GET');
    res.then(response => {
        orderData.value = response.data;
    });
}

getSingleOrder();

const calculateTotal = (products) => {
    return products.reduce((acc, product) => acc + product.price * product.pivot.quantity, 0);
};

// write a function to make first letter capital
const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const updateOrder = () => {
    const res = data.fetchProtectedApi('/api/admin/orders/update', orderData.value, 'POST');
    res.then(response => {
        router.push('/admin/orders');
    });
}

</script>

<template>
    <div class="bg-white" v-if="orderData != null">
        <div class="mx-auto px-12 py-8">
            <h2 class="text-2xl font-bold tracking-tight text-gray-900">Orders</h2>
            <p class="my-10"></p>
        </div>
        <div class="px-12 py-8">
            <div class="order-info flex justify-between w-full">
                <p class="w-1/3"><strong>Order ID:</strong> {{ orderData.id }}</p>
                <p class="w-1/3"><strong>Total Amount:</strong> ${{ calculateTotal(orderData.products) }}</p>
                <p class="w-1/3"><strong>Address:</strong> Name: {{ orderData.name }}, Phone: {{ orderData.phone }}, Email: {{
      orderData.email }}</p>
                <p class="w-1/3"><strong>Customer:</strong> {{ orderData.user.name }}</p>
                <p class="w-1/3"><strong>Payment Method:</strong> {{ orderData.payment_method }}</p>
                <p class="w-1/3"><strong>Status:</strong>
                    <select v-model="orderData.status">
                        <option v-for="status in orderStatus" :value="status">{{ capitalize(status) }}</option>
                    </select>
                </p>
                <p class="w-1/3"><strong>Note:</strong> <input type="text" v-model="orderData.notes"></p>
                <hr />
            </div>
            <div class="border my-5 p-5">
                <div class="flex items-center my-3" v-for="product in orderData.products" :key="product.id">
                    <router-link class="w-2/3" :to="`/products/${product.id}`">{{ product.name }}</router-link>
                    <p class="w-[100px]">${{ product.price }}</p>
                    <p>Quantity: <input type="number" v-model="product.pivot.quantity"></p>
                </div>
            </div>
        </div>
        <button @click="updateOrder()"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Update Order
        </button>
    </div>
</template>

<style scoped></style>