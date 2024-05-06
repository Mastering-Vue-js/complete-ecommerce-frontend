//create home component
<script setup>
import { authStore } from '../../store/store';
import { data } from '../../store/data';

const getCategories = () => {
    const res = authStore.fetchProtectedApi('/api/categories', {}, 'GET');
    res.then(response => {
        data.categories = response.data;
    });
}
getCategories();

const getProducts = () => {
    const res = authStore.fetchProtectedApi('/api/products', {}, 'GET');
    res.then(response => {
        data.products = response.data;
    });
}
getProducts();
</script>
<template>
    <RouterView />
</template>

<style></style>