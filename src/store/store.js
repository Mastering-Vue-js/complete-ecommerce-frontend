import { ref, reactive } from 'vue'
import router from '../router/router'
import { cart } from './cart'
import { wishlist } from './wishlist'
import axios from 'axios';
const authStore = reactive({
    apiBase: 'http://localhost:8000',
    isAuthenticated: localStorage.getItem('auth') == 1,
    user: JSON.parse(localStorage.getItem('user')),
    errors: null,
    async fetchPublicApi(endPoint = "", params = {}, requestType = "GET") {
        let request = {
            method: requestType.toUpperCase(),
            headers: {
                "Access-Control-Allow-Origin": "*",
                Accept: "application/vnd.api+json",
                "Content-Type": "application/vnd.api+json",
            },
        }

        if (requestType.toUpperCase() == "POST" || "PUT" == requestType.toUpperCase()) {
            request.body = JSON.stringify(params);
        }

        const res = await fetch(authStore.apiBase + endPoint, request);

        const response = await res.json();
        return response;
    },
    async fetchProtectedApi(endPoint = "", params = {}, requestType = "GET") {
        const token = authStore.getUserToken()
        let request = {
            method: requestType.toUpperCase(),
            headers: {
                "Access-Control-Allow-Origin": "*",
                Accept: "application/vnd.api+json",
                "Content-Type": "application/vnd.api+json",
                'Authorization': `Bearer ${token}`,
            },
        }

        if (requestType.toUpperCase() == "POST" || "PUT" == requestType.toUpperCase()) {
            request.body = JSON.stringify(params);
        }

        const res = await fetch(authStore.apiBase + endPoint, request);

        const response = await res.json();
        return response;
    },
    async uploadProtectedApi(endPoint = "", params = {}) {
        const token = authStore.getUserToken()

        const res = await axios.post(authStore.apiBase + endPoint, params, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "multipart/form-data",
                'Authorization': `Bearer ${token}`,
            }
        });

        const response = await res.data;
        return response;
    },
    authenticate(username, password) {
        authStore.fetchPublicApi('/api/login', { email: username, password }, 'POST')
            .then(res => {
                if (res.status) {
                    authStore.isAuthenticated = true
                    authStore.user = res.data
                    localStorage.setItem('auth', 1)
                    localStorage.setItem('user', JSON.stringify(res.data))

                    if ('admin' == res.data.type) {
                        router.push('/admin')
                    } else {
                        router.push('/')
                    }
                }
            });
    },
    register(name, email, password) {
        authStore.fetchPublicApi('/api/register', { name: name, email: email, password: password }, 'POST')
            .then(res => {
                if (res.status) {
                    authStore.errors = null;
                    router.push('/login');
                } else {
                    authStore.errors = res.errors;
                }
            });
    },
    logout() {
        authStore.isAuthenticated = false
        authStore.user = {}
        localStorage.setItem('auth', 0)
        localStorage.setItem('user', '{}')
        cart.items = {}
        cart.saveCartInLocalStorage()
        wishlist.items = []
        router.push('/login')
    },
    getUserToken() {
        return authStore.user.accessToken;
    },
    getUserType() {
        return authStore.user.type;
    }
})

export { authStore }