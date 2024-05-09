import { reactive, computed } from 'vue'
import { order } from './order'
import { data } from './data';
const cart = reactive({
    items: {},
    totalCartItems: computed(() => {
        let total = 0
        for (let id in cart.items) {
            total += cart.items[ id ].quantity
        }
        return total
    }),
    totalPrice: computed(() => {
        let total = 0
        for (let id in cart.items) {
            total += cart.items[ id ].product.price * cart.items[ id ].quantity
        }
        return parseFloat(total.toFixed(2))
    }),
    addItem(product) {
        const index = this.items.findIndex(item => item.product_id == product.id);

        const res = data.fetchProtectedApi('/api/cart/add', { product_id: product.id, quantity: 1, price: product.price }, 'POST');
        res.then(response => {
            let cartItem = response.data;
            cartItem.product = product;
            if (index == -1) {
                this.items.push(cartItem);
            } else {
                this.items[ index ] = cartItem;
            }
        })
    },
    removeItem(product) { },
    deleteCartItem(item, index) {
        const res = data.fetchProtectedApi(`/api/cart/delete/${item.id}`, {}, 'DELETE');
        res.then(response => {
            if (response.status) {
                this.items.splice(index, 1);
            }
        });
    },
    saveCartInLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(this.items))
    },
    getCartFromLocalStorage() {
        const res = data.fetchProtectedApi('/api/cart');
        res.then(response => {
            this.items = response.data
        })
    },
    checkout() {
        order.placeOrder(this.totalPrice, this.items)
    }
})
cart.getCartFromLocalStorage()
export { cart }