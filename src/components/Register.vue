//create home component
<script setup>
import { ref } from 'vue'
import { authStore } from '../store/store';
const auth = authStore

import router from '../router/router'

const name = ref('')
const email = ref('')
const password = ref('')

</script>
<template>
    <p class="mt-10">
    <section class="">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
            <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1
                        class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                        Sign up to your account
                    </h1>
                    <div class="space-y-4 md:space-y-6" action="#">
                        <div>
                            <label class="block mb-2 text-sm font-medium text-gray-900 ">Name</label>
                            <input v-model="name"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                placeholder="Name" required="">
                                <p v-if="auth.errors?.name" class="my-2 italic text-sm text-red-400">{{ auth.errors?.name[0] }}</p>
                        </div>
                        <div>
                            <label class="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
                            <input v-model="email"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                placeholder="Email" required="">
                                <p v-if="auth.errors?.email" class="my-2 italic text-sm text-red-400">{{ auth.errors?.email[0] }}</p>
                        </div>
                        <div>
                            <label for="password"
                                class="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                            <input v-model="password" type="password" name="password" id="password"
                                placeholder="••••••••"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                required="">
                                <p v-if="auth.errors?.password" class="my-2 italic text-sm text-red-400">{{ auth.errors?.password[0] }}</p>
                        </div>
                        <div class="flex items-center justify-between">
                            <router-link to="/login" class="text-sm font-medium text-primary-600 hover:underline">Already have an account? Login</router-link>
                        </div>
                        <p class="text-right">
                            <button @click="auth.register(name, email, password)"
                                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                <span>Sign Up</span>
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </p>
</template>

<style></style>