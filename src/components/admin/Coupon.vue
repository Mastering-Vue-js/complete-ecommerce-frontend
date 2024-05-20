<script setup>
import { ref, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { data } from '../../store/data';

const route = useRoute();
const router = useRouter();
const addCouponToggle = ref(false);

const couponData = ref(null);
const CouponForm = reactive({
    code: '',
    type: 'fixed',
    discount: ''
});

const getAllCoupons = () => {
    const res = data.fetchProtectedApi('/api/admin/coupon', {}, 'GET');
    res.then(response => {
        couponData.value = response.data;
    });
}

getAllCoupons();

const saveCoupon = () => {
    const res = data.fetchProtectedApi('/api/admin/coupon/add', CouponForm, 'POST');
    res.then(response => {
        if (response.status) {
            couponData.value.push(response.data);
            addCouponToggle.value = false;
        }
    });
}

</script>

<template>
    <div class="bg-white">
        <div class="mx-auto px-12 py-8">
            <h2 class="text-2xl font-bold tracking-tight text-gray-900">Coupons</h2>
            <button @click="addCouponToggle = !addCouponToggle"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Coupon</button>
            <div v-if="addCouponToggle" class="space-y-4 md:space-y-6">
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 ">Code</label>
                    <input v-model="CouponForm.code"
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="Code">
                </div>
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 ">Coupon Type</label>
                    <select v-model="CouponForm.type">
                        <option value="fixed">Fixed</option>
                        <option value="percentage">Percentage</option>
                    </select>
                </div>
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 ">Discount</label>
                    <input v-model="CouponForm.discount"
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="Discount">
                </div>
                <button @click="saveCoupon()"
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    <span>Save</span>
                </button>
            </div>
            <div>
                <div class="flex items-center my-5 border-2	" v-for="item in couponData" :key="item.id">
                    <p class="w-2/3"> Coupon Code: {{ item.code }} </p>
                    <p class="w-2/3"> Type: {{ data.ucFirst(item.type) }}</p>
                    <p class="w-2/3">Discount: {{ item.discount }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>