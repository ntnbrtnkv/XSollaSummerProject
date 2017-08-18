<template>
    <div :id="'search-result-' + drug.id" class="drug-table__row search-panel__results__item"
        @mousedown="addToFav(drug)">
        <div class="drug-table__cell">{{ drug.name }}</div>
        <div class="drug-table__cell">{{ drug.form }}</div>
        <div class="drug-table__cell drug-table__cell_align_right">{{ drug.limit_price | ru_currency }}</div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import MutationTypes from './../../../store/mutation-types';
    import EventBus from './../../../event-bus';

    export default {
        props: [
            'drug'
        ],

        methods: {
            addToFav: function(drug) {
                Vue.set(drug, 'addedThroughtSearch', true);
                this.$store.commit(MutationTypes.ADD_FAV_DRUG, drug);
                EventBus.$emit('item-commited');
            }
        }
    }
</script>
