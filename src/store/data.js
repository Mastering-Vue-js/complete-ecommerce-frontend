import { reactive } from "vue";

const data = reactive({
    categories: null,
    products: null,
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

        const res = await fetch(data.apiBase + endPoint, request);

        const response = await res.json();
        return response;
    },
    async fetchProtectedApi(endPoint = "", params = {}, requestType = "GET") {
        const token = data.getUserToken()
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

        const res = await fetch(data.apiBase + endPoint, request);

        const response = await res.json();
        return response;
    },
    async uploadProtectedApi(endPoint = "", params = {}) {
        const token = data.getUserToken()

        const res = await axios.post(data.apiBase + endPoint, params, {
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
        data.fetchPublicApi('/api/login', { email: username, password }, 'POST')
            .then(res => {
                if (res.status) {
                    data.isAuthenticated = true
                    data.user = res.data
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
        data.fetchPublicApi('/api/register', { name: name, email: email, password: password }, 'POST')
            .then(res => {
                if (res.status) {
                    data.errors = null;
                    router.push('/login');
                } else {
                    data.errors = res.errors;
                }
            });
    },
    logout() {
        data.isAuthenticated = false
        data.user = {}
        localStorage.setItem('auth', 0)
        localStorage.setItem('user', '{}')
        cart.items = {}
        cart.saveCartInLocalStorage()
        wishlist.items = []
        router.push('/login')
    },
    getUserToken() {
        return data.user.accessToken;
    },
    getUserType() {
        return data.user.type;
    }
});

export { data };