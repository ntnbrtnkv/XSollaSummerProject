<template>
    <div id="search-panel__results"
         :class="['drug-table', 'search-panel__results', {'search-panel__results_hidden': !isSearching}]">
        <ResultItem v-for="drug in getUniqueFoundDrugsList" :key="drug.id" :drug="drug"></ResultItem>
    </div>
</template>

<script>
    import ResultItem from './item';

    export default {
        components: {
            ResultItem
        },

        computed: {
            getFoundDrugsList() {
                return this.$store.state.foundDrugList;
            },

            getUniqueFoundDrugsList() {
                const found = this.getFoundDrugsList;
                const ids = this.$store.getters.favDrugsIdList;
                return found.filter(drug => !ids.some(id => id === drug.id));
            },

            isSearching() {
                return this.$store.state.isSearching;
            }
        }
    }
</script>

