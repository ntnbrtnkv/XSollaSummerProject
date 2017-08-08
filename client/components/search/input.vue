<template>
    <div class="search-panel__search-line">
        <i class="fa fa-search search-panel__icon" aria-hidden="true"></i>
        <input id="search-panel__input"
                class="search-panel__input"
                type="search"
                placeholder="Поиск лекарства"
                @focus="startSearching"
                @blur="endSearching">
    </div>
</template>

<script>
    import MutationTypes from '../../store/mutation-types';
    import EventBus from '../../event-bus';

    EventBus.$on('item-commited', function() {
        const inputEl = document.getElementById('search-panel__input');
        inputEl.value = '';
    });

    export default {
        methods: {
            startSearching: function() {
                this.$store.commit(MutationTypes.START_SEARCHING);
            },

            endSearching: function() {
                this.$store.commit(MutationTypes.END_SEARCHING);
            }
        }
    }
</script>
