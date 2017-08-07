import Vue from 'vue';
import FavDrugsComponent from './components/fav-drugs-cards/index';
import store from './store/store';

const app = new Vue({
    components: {
        FavDrugsComponent
    },

    computed: {
        getTitle() {
            return this.$store.state.title;
        }
    },

    render(h) {
        return (
            <div class="page">
                 {/* <h1 class="page__title">{{ title }}</h1> */}
                <FavDrugsComponent></FavDrugsComponent>
            </div>
        );
    },

    store
});

export { app }
