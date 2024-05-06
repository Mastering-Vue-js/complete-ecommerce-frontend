//create home component
<script setup>
import { ref, reactive } from 'vue';
import { authStore } from '../../store/store';
import { data } from '../../store/data';

const addCategoryToggle = ref(false);
const categoryData = reactive({
    name: '',
    description: '',
    image: ''
});

const getCategories = () => {
    const res = authStore.fetchProtectedApi('/api/categories', {}, 'GET');
    res.then(response => {
        data.categories = response.data;
    });
}
getCategories();

const deleteCategory = (index, item) => {
    const res = authStore.fetchProtectedApi('/api/admin/categories/delete/' + item.id, {}, 'DELETE');
    res.then(response => {
        data.categories.splice(index, 1);
    });
}

const addCategory = () => {
    const res = authStore.uploadProtectedApi('/api/admin/categories/add', categoryData);
    res.then(response => {
        data.categories.push(response.data);
        addCategoryToggle.value = false;
    });
}

const selectFile = (event) => {
    const file = event.target.files[ 0 ];
    categoryData.image = file;
}

</script>
<template>
    <div class="bg-white">
        <div class="mx-auto px-12 py-8">
            <h2 class="text-2xl font-bold tracking-tight text-gray-900">Categories</h2>
            <button @click="addCategoryToggle = !addCategoryToggle"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Category</button>
            <div v-if="addCategoryToggle">
                <div class="space-y-4 md:space-y-6">
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900 ">Name</label>
                        <input v-model="categoryData.name"
                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            placeholder="Name">
                    </div>
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900 ">Description</label>
                        <input v-model="categoryData.description"
                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            placeholder="Description">
                    </div>
                    <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 ">Image</label>
                        <input @change="selectFile($event)" type="file"
                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
                    </div>

                    <button @click="addCategory()"
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        <span>Save</span>
                    </button>
                </div>
            </div>
            <div>
                <div class="flex items-center my-5 border-2	" v-for="(item, index) in data.categories" :key="index">
                    <img :src="authStore.apiBase + '/' + item.image" alt="">
                    <p class="w-2/3">
                        {{ item.name }}
                    </p>
                    <p class="w-[100px]">{{ item.description }}</p>
                    <button @click="deleteCategory(index, item)"
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