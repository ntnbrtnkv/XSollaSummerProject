import Vue from 'vue';
import VueCookie from 'vue-cookie';
import { sync } from 'vuex-router-sync';
import App from './components/app';
import router from './router/index';
import store from './store/store';

Vue.use(VueCookie);

Vue.filter('ru_currency', function (value) {
    if (value === undefined) return '';
    const every = 3;
    const nbsp = '\xa0';
    const ruble = '\u20bd';
    const re = '\\d(?=(\\d{' + (every || 3) + '})+\\.)';
    return value.toFixed(2).replace(new RegExp(re, 'g'), '$&' + nbsp) + nbsp + ruble;
});

sync(store, router);

const app = new Vue({
    router,
    store,
    ...App
});

export { app, router, store }
