import { reactive } from 'vue'
import { authStore } from './store'
import { data } from './data';
import { cart } from './cart';

const order = reactive({
    orders: [],
    fetchOrders() {
        const res = data.fetchProtectedApi('/api/orders', {}, 'GET');
        res.then(response => {
            this.orders = response.data;
        })
    },
    fetchAdminOrders() {
        const res = data.fetchProtectedApi('/api/admin/orders', {}, 'GET');
        res.then(response => {
            this.orders = response.data;
        })
    },
    async placeOrder(checkoutData) {
        const res = data.fetchProtectedApi('/api/orders/add', checkoutData, 'POST');
        res.then(response => {
            if (response.status) {
                cart.emptyCart();
                return true;
            } else {
                return false;
            }
        });
    }
})

export { order }