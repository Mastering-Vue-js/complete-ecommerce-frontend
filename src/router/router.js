import { createRouter, createWebHistory } from 'vue-router'
import adminMain from '../components/admin/Main.vue';
import adminHome from '../components/admin/Home.vue';
import adminSidebar from '../components/admin/Sidebar.vue';
import adminProduct from '../components/admin/Products.vue';
import adminCategories from '../components/admin/Categories.vue';
import adminEditProduct from '../components/admin/EditProducts.vue';

import Home from '../components/Home.vue'
import About from '../components/About.vue'
import Contact from '../components/Contact.vue'
import Products from '../components/Products.vue'
import Product from '../components/Product.vue'
import Sidebar from '../components/Sidebar.vue'
import Protected from '../components/Protected.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue';
import { authStore } from '../store/store'
import Cart from '../components/Cart.vue'
import Orders from '../components/Orders.vue'

import Editor from '../components/Editor.vue'

const routes = [
    {
        path: '/', components: {
            default: Home,
            LeftSideBar: Sidebar
        }
    },
    {
        path: '/admin',
        components: {
            default: adminMain,
            LeftSideBar: adminSidebar,
        },
        meta: {
            requiresAuth: true,
            type: 'admin',
        },
        children: [
            {
                path: '', components: {
                    default: adminHome
                }
            },
            {
                path: 'products', components: {
                    default: adminProduct
                }
            },
            {
                path: 'categories', components: {
                    default: adminCategories
                }
            },
            {
                path: 'products/:id', components: {
                    default: adminEditProduct
                },
            },
        ]
    },
    {
        path: '/login', components: {
            default: Login,
            LeftSideBar: Sidebar
        }
    },
    {
        path: '/register', components: {
            default: Register,
            LeftSideBar: Sidebar
        }
    },
    {
        path: '/about', components: {
            default: About,
            LeftSideBar: Sidebar
        }
    },
    {
        path: '/editor', components: {
            default: Editor,
            LeftSideBar: Sidebar
        },
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/contact', components: {
            default: Contact,
            LeftSideBar: Sidebar
        }
    },
    {
        path: '/products', components: {
            default: Products,
            LeftSideBar: Sidebar
        }
    },
    {
        path: '/cart', components: {
            default: Cart,
            LeftSideBar: Sidebar
        }
    },
    {
        path: '/orders', components: {
            default: Orders,
            LeftSideBar: Sidebar
        }
    },
    {
        path: '/products/:id', components: {
            default: Product,
            LeftSideBar: Sidebar
        },
        name: 'product',
    },
    {
        path: '/protected', components: {
            default: Protected,
            LeftSideBar: Sidebar,
        },
        meta: {
            requiresAuth: true
        }
    }
]

// const isAuthenticated = () => {
//     return localStorage.getItem('token')=='123'
// }

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        next('/login')
    } else if (to.meta.requiresAuth && to.meta.type != authStore.getUserType()) {
        next('/')
    } else {
        next()
    }
})

export default router
