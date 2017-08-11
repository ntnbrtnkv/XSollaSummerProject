import Vue from 'vue';
import Router from 'vue-router';
import Index from './../views/Index';
import Details from './../views/Details';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Index
        },
        {
            name: 'drug',
            path: '/drug/:drugId',
            component: Details
        }
    ]
});