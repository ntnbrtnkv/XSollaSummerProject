<template>
    <div class="drug-table__row">
        <div class="drug-table__cell drug-table__cell_field">
             {{ rowInfo.field }} 
        </div>
        <div class="drug-table__cell">
             {{ rowInfo.description }} 
        </div>
    </div>
</template>

<script>
    export default {
        props: [
            'rowInfo'
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
