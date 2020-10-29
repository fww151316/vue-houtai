import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)
const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('../views/login/index.vue')
        },
        {
            path: '/home',
            component: () => import('../views/home/index.vue')
        },
        {
            path: '/register',
            component: () => import('../views/register/index.vue')
        },
        {
            path: '/alter/:id',
            component: () => import('../views/alter/index.vue')
        }
    ]
});




export default router