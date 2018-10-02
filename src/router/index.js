import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Dashboard from '@/components/Dashboard'
import CreateAppointment from '@/components/CreateAppointment'
import store from '../store.js';

Vue.use(Router)

function requireAuth (to, from, next) {
    if ( store.getters.loggedUser  ) {
        next();
    } else {
        next(false);
    }
}

function requireGuest (to, from, next) {
    if ( store.getters.loggedUser  ) {
        next(false);
    } else {
        next();
    }
}

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'HomePage',
            component: HomePage
        },
        {
            path: '/register',
            name: 'Register',
            component: Register,
            beforeEnter: requireGuest
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
            beforeEnter: requireGuest
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: Dashboard,
            beforeEnter: requireAuth
        },
        {
            path: '/appointments/create',
            name: 'CreateAppointment',
            component: CreateAppointment,
            beforeEnter: requireAuth
        }
    ]
})
