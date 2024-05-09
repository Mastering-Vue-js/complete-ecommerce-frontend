//create home component
<script setup>
import { ref, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { authStore } from '../../store/store';
import { data } from '../../store/data';

const route = useRoute();
const router = useRouter();
const productID = route.params.id;

const productData = reactive({
    name: '',
    description: '',
    image: '',
    price: 1,
    stock: 1,
    category_id: 2
});

const getSingleProduct = () => {
    const res = authStore.fetchProtectedApi('/api/products/' + productID, {}, 'GET');
    res.then(response => {
        productData.name = response.data.name;
        productData.description = response.data.description;
        productData.price = response.data.price;
        productData.stock = response.data.stock;
        productData.image = response.data.image;
        productData.category_id = response.data.category_id;
    });
}

getSingleProduct();

const updateProduct = () => {
    productData.product_id = productID;
    const res = authStore.uploadProtectedApi('/api/admin/products/update', productData);
    res.then(response => {
        if (response.status) {
            for (let i = 0; i < data.products.length; i++) {
                if (data.products[ i ].id == productID) {
                    data.products[ i ] = response.data;
                    // data.products[ i ].image = response.data.image;
                    // data.products[ i ].description = response.data.description;
                    // data.products[ i ].price = response.data.price;
                    // data.products[ i ].stock = response.data.stock;
                    // data.products[ i ].category_id = response.data.category_id;
                    break;
                }
            }
            router.push('/admin/products/');
        }
    });
}

const selectFile = (event) => {
    const file = event.target.files[ 0 ];
    productData.image = file;
}

</script>
<template>
    <div class="bg-white">
        <div class="mx-auto px-12 py-8">
            <h2 class="text-2xl font-bold tracking-tight text-gray-900">Products</h2>
            <div class="space-y-4 md:space-y-6">
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 ">Name</label>
                    <input v-model="productData.name"
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="Name">
                </div>
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 ">Description</label>
                    <input v-model="productData.description"
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="Description">
                </div>
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 ">Price</label>
                    <input v-model="productData.price"
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="Price">
                </div>
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 ">Stock</label>
                    <input v-model="productData.stock"
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="Stock">
                </div>
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 ">Category</label>
                    <select v-model="productData.category_id">
                        <option v-for="(item, index) in data.categories" :key="index" :value="item.id"> {{ item.name
                            }}</option>
                    </select>
                </div>
                <img :src="authStore.apiBase + '/' + productData.image" alt="">
                <div>
                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 ">Image</label>
                    <input @change="selectFile($event)" type="file"
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
                </div>

                <button @click="updateProduct()"
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    <span>Update</span>
                </button>
            </div>
        </div>
    </div>
</template>

<style></style>