<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { data } from '../store/data';
import { order } from "../store/order";
import { cart } from "../store/cart";

const countries = reactive([
    {
        name: 'Bangladesh',
        code: 'BD',
        cities: [ 'Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi', 'Khulna', 'Barishal', 'Mymensingh' ],
    },
    {
        name: 'Nepal',
        code: 'NP',
        cities: [ 'Kathmandu', 'Pokhara', 'Biratnagar', 'Birgunj', 'Dharan', 'Bharatpur', 'Janakpur' ],
    },
    {
        name: 'India',
        code: 'IN',
        cities: [ 'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Ahmedabad', 'Chennai', 'Kolkata' ],
    },
    {
        name: 'Pakistan',
        code: 'PK',
        cities: [ 'Karachi', 'Lahore', 'Faisalabad', 'Rawalpindi', 'Multan', 'Gujranwala', 'Islamabad' ],
    },
    {
        name: 'Sri Lanka',
        code: 'LK',
        cities: [ 'Colombo', 'Galle', 'Kandy', 'Jaffna', 'Negombo', 'Anuradhapura', 'Polonnaruwa' ],
    },
    {
        name: 'Bhutan',
        code: 'BT',
        cities: [ 'Thimphu', 'Phuntsholing', 'Paro', 'Punakha', 'Wangdue Phodrang', 'Jakar', 'Mongar' ],
    }
]);

const selectedCountryIdx = ref(0);
const router = useRouter();

const checkout = reactive({
    name: data.user.name,
    phone: '+8801234567890',
    email: data.user.email,
    line1: 'House 27, Road 5, Block A',
    line2: 'Sylhet Gas line',
    country: 'Bangladesh',
    city: 'Sylhet',
    coupon: '',
    notes: 'This is order note',
    payment_method: 'cod',
});

const couponData = ref(null);

const renderCities = () => {
    selectedCountryIdx.value = countries.findIndex(country => country.name === checkout.country);
};

const createOrder = () => {
    const status = order.placeOrder(checkout);

    if (status) {
        router.push('/orders');
    } else {
        alert('Order failed');
    }
};

const checkoutTotal = () => {
    if (couponData.value != null) {
        if (couponData.value.type === 'percentage') {
            return cart.totalPrice - (cart.totalPrice * couponData.value.discount / 100);
        } else {
            return cart.totalPrice - couponData.value.discount;
        }
    } else {
        return cart.totalPrice;
    }
}

const applyCoupon = () => {
    const res = data.fetchProtectedApi(`/api/verify-coupon`, { code: checkout.coupon }, 'POST');
    res.then(response => {
        if (response.status) {
            couponData.value = response.data;
        } else {
            alert('Invalid coupon');
            couponData.value = null;
        }
    });
};

</script>

<template>
    <div class="bg-white" v-if="cart.items.length > 0">
        <div class="mx-auto px-12 py-8">
            <h2 class="text-2xl font-bold tracking-tight text-gray-900">Checkout </h2>
            <div>
                <div class="space-y-4 md:space-y-6" action="#">
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900 ">Name</label>
                        <input v-model="checkout.name"
                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            placeholder="Name" required="">
                    </div>
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900 ">Phone</label>
                        <input v-model="checkout.phone"
                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            placeholder="Phone" required="">
                    </div>
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
                        <input v-model="checkout.email"
                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            placeholder="Email" required="">
                    </div>
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900 ">Address 1</label>
                        <input v-model="checkout.line1"
                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            placeholder="Address 1" required="">
                    </div>
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900 ">Address 2</label>
                        <input v-model="checkout.line2"
                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            placeholder="Address 2" required="">
                    </div>
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900 ">Country</label>
                        <select v-model="checkout.country" @change="renderCities()">
                            <option v-for="(country, index) in countries" :key="index" :value="country.name"> {{
        country.name }} </option>
                        </select>
                    </div>
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900 ">City</label>
                        <select v-model="checkout.city">
                            <option v-for="(city, index) in countries[ selectedCountryIdx ].cities" :key="index"
                                :value="city"> {{
        city }} </option>
                        </select>
                    </div>
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900 ">Note</label>
                        <input v-model="checkout.notes"
                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            placeholder="Notes" required="">
                    </div>
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900 ">Payment Method</label>
                        <select v-model="checkout.payment_method">
                            <option value="cod">Cash on Delivery</option>
                            <option value="paypal">Paypal</option>
                        </select>
                    </div>
                </div>

                <div class="flex gap-5 py-6">
                    <div class="w-1/2">
                        <div>
                            <label class="block mb-2 text-sm font-medium text-gray-900 ">Coupon Code</label>
                            <input v-model="checkout.coupon"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                placeholder="Coupon" required="">
                        </div>
                        <button @click="applyCoupon()"
                            class="ml-5 mt-5 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                            Apply Coupon
                        </button>
                    </div>
                    <div class="w-1/2">
                        <h3>Checkout Summary</h3>
                        <p v-for="item in cart.items"> {{ item.product.name }} x {{ item.quantity }} = {{
        item.product.price * item.quantity }} </p>
                        <hr>
                        <p>Subtotal = {{ cart.totalPrice }}</p>
                        <p> Discount = {{ cart.totalPrice - checkoutTotal() }}</p>
                        <hr>
                        <p> Total = {{ checkoutTotal() }}</p>
                    </div>
                </div>

                <button @click="createOrder()"
                    class="ml-5 mt-5 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Place Order
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped></style>