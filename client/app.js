import Vue from 'vue';
import FavDrugsComponent from './components/fav-drugs/index';
import SearchComponent from './components/search/index';
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

const app = new Vue({
    components: {
        FavDrugsComponent,
        SearchComponent
    },

    render(h) {
        return (
            <div class="page">
                <h1 class="page__title">Pharmacy</h1> 
                <SearchComponent></SearchComponent>
                <FavDrugsComponent></FavDrugsComponent>
            </div>
        );
    },

    store
});

export { app }
