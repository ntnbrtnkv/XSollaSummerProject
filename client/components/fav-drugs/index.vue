<template>
    <div id="fav-drugs" class="fav-drugs">
        <h2 class="fav-drugs__title">Избранные препараты</h2>

        <div class="fav-drugs__container">
            <template v-if="getFavDrugsList.length > 0">
                <Card v-for="drug in getFavDrugsList" :key="drug.id" :drug="drug"></Card>
            </template>
            <h3 v-else class="fav-drugs__empty-message">Сейчас тут пусто...</h3>
        </div>
    </div>
</template>

<script>
    import ActionTypes from './../../store/action-types';
//    import Card from './../drug-card/index.vue';
    const Card = () => import('./../drug-card/index.vue');
    import MutationTypes from './../../store/mutation-types';

    export default {
        components: {
            Card
        },

        beforeCreate: function() {
            const sessionId = this.$cookie.get('_sessionId');
            this.$store.dispatch(ActionTypes.GET_ACTUAL_SESSION_INFO, sessionId)
                .then(({id, drugs}) => {
                    this.$cookie.set('_sessionId', id, '1d');
                    this.$store.commit(MutationTypes.SET_SESSION_ID, id);
                    this.$store.commit(MutationTypes.SET_FAV_DRUG_LIST, drugs);
                })
                .catch(err => console.log(err));
        },

        computed: {
            getFavDrugsList() {
                return this.$store.state.favDrugsList;
            },

            isSearching() {
                return this.$store.state.isSearching;
            }
        }
    }
</script>
