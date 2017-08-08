<template>
    <div id="search-panel__results"
         :class="['drug-table', 'search-panel__results', {'search-panel__results_display': isSearching}]">
        <ResultItem v-for="drug in getFoundDrugsList" :key="drug.id" :drug="drug"></ResultItem>
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
                return this.$store.state.foundDrugsList;
            },

            isSearching() {
                return this.$store.state.isSearching;
            }
        }
    }
</script>

