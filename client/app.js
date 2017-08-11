import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import App from './components/App';
import FavDrugsComponent from './components/fav-drugs/index';
import SearchComponent from './components/search/index';
import router from './router/index';
import store from './store/store';

Vue.filter('currency', function (value) {
    if (!value) return '';
    value = value.toString();
    const every = 3;
    const afterCommaWidth = 2;
    const nbsp = '\xa0';
    const ruble = '\u20bd';
    let [beforeComma, afterComma] = value.split('.', 2);
    afterComma = afterComma || '';
    if (afterComma.length < afterCommaWidth)
        afterComma += new Array(afterCommaWidth - afterComma.length + 1).join('0');
    const beforeCommaLength = beforeComma.length;
    let newPrice = '';
    for (let i = beforeCommaLength; i > 0; i -= every) {
        newPrice = nbsp + beforeComma.slice(i - every, i) + newPrice;
    }
    return newPrice + '.' + afterComma + nbsp + ruble;
});

sync(store, router);

const app = new Vue({
    router,
    store,
    ...App
});

export { app, router, store }
