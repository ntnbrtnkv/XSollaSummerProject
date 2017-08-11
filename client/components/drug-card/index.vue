<template>
    <div class="drug-card">
        <div class="drug-card__header">
            <span class="drug-card__name">{{ drug.name }}</span>
            <div class="drug-card__delete" @click="deleteFromFav(drug)">&#10005</div>  
        </div>
        <router-link v-bind:to="'/drug/' + drug.id" class="drug-card__body">
            <div class="drug-card__description">
                {{ drug.name }}: {{ drug.form }}
            </div>
            <div class="drug-card__price">
                {{ drug.limit_price | ru_currency }}
            </div>
        </router-link>
    </div>
</template>

<script>
    import Vue from 'vue';
    import MutationTypes from './../../store/mutation-types';

    export default {
        props: [
            'drug'
        ],

        methods: {
            deleteFromFav: function(drug) {
                this.$store.commit(MutationTypes.DELETE_FAV_DRUG, drug);
            }
        },

        mounted() {
            if (!!this.drug.addedThroughtSearch) {
                let count = 4;
                const selfEl = this.$el;
                while (count > 0) {
                    setTimeout(function() {
                        selfEl.classList.toggle('drug-card_fresh');
                    }, 750 * count);
                    count--;
                }
                Vue.delete(this.drug, 'addedThroughtSearch');
            }
        }
    }
</script>

