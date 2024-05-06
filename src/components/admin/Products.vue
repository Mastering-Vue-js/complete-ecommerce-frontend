//create home component
<script setup>
import { ref, reactive } from 'vue';
import { authStore } from '../../store/store';
import { data } from '../../store/data';

const addProductToggle = ref(false);
const productData = reactive({
    name: '',
    description: '',
    image: '',
    price: 1,
    stock: 1,
    category_id: 2
});

const deleteProduct = (index, item) => {
    const res = authStore.fetchProtectedApi('/api/admin/products/delete/' + item.id, {}, 'DELETE');
    res.then(response => {
        data.products.splice(index, 1);
    });
}

const addProduct = () => {
    const res = authStore.uploadProtectedApi('/api/admin/products/add', productData);
    res.then(response => {
        data.products.push(response.data);
        addProductToggle.value = false;
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
            <button @click="addProductToggle = !addProductToggle"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Product</button>
            <div v-if="addProductToggle">
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
                            <option v-for="(item, index) in data.categories" :key="index" :value="item.id"> {{ item.name }}</option>
                        </select>
                    </div>
                    <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 ">Image</label>
                        <input @change="selectFile($event)" type="file"
                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
                    </div>

                    <button @click="addProduct()"
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        <span>Save</span>
                    </button>
                </div>
            </div>
            <div>
                <div class="flex items-center my-5 border-2	" v-for="(item, index) in data.products" :key="index">
                    <img :src="authStore.apiBase + '/' + item.image" alt="">
                    <p class="w-2/3">
                        {{ item.name }}
                    </p>
                    <p class="w-[100px]">{{ item.category.name }}</p>
                    <p class="w-[100px]">{{ item.description }}</p>
                    <button @click="editProduct(index, item)"
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit</button>
                    <button @click="deleteProduct(index, item)"
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Delete</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
img {
    max-width: 100px;
}
</style>