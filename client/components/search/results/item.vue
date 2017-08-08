<template>
    <div class="drug-table__row"
        @mousedown="addToFav(drug)">
        <div class="drug-table__cell">{{ drug.name }}</div>
        <div class="drug-table__cell">{{ drug.form }}</div>
        <div class="drug-table__cell drug-table__cell_align_right">{{ drug.limit_price | currency }}</div>
    </div>
</template>

<script>
    import MutationTypes from '../../../store/mutation-types';

    export default {
        props: [
            'drug'
        ],

        methods: {
            addToFav: function(drug) {
                this.$store.commit(MutationTypes.ADD_FAV_DRUG, drug);
            }
        }
    }
</script>
