<template>
    <div class="search-panel__search-line">
        <i class="fa fa-search search-panel__icon" aria-hidden="true"></i>
        <input id="search-panel__input"
                class="search-panel__input"
                type="search"
                placeholder="Поиск лекарства"
                @focus="startSearching"
                @blur="endSearching"
                @input="searchDrug($event.target.value)">
    </div>
</template>

<script>
    import ActionTypes from './../../store/action-types';
    import EventBus from './../../event-bus';
    import MutationTypes from './../../store/mutation-types';

    EventBus.$on('item-commited', function() {
        const inputEl = document.getElementById('search-panel__input');
        inputEl.value = '';
    });

    export default {
        methods: {
            startSearching: function () {
                this.$store.commit(MutationTypes.START_SEARCHING);
            },

            endSearching: function () {
                this.$store.commit(MutationTypes.END_SEARCHING);
            },

            searchDrug: function (value) {
                value = value.trim();
                if (value) {
                    this.startSearching();

                    this.$store.dispatch(ActionTypes.SEARCH_DRUG, value)
                        .then((res) => {
                            this.$store.commit(MutationTypes.SET_FOUND_DRUG_LIST, res.data);
                        })
                        .catch((err) => console.log(err));
                }
            },
        }
    }
</script>
