<template>
    <div class="drug-card">
        <div class="drug-card__header">
            <span class="drug-card__name">{{ drug.name }}</span>
            <div class="drug-card__delete" @click="deleteFromFav(drug)">&#10005</div>  
        </div>
        <a class="drug-card__body" href="#">
            <div class="drug-card__description">
                {{ drug.name }}: {{ drug.form }}
            </div>
            <div class="drug-card__price">
                {{ drug.limit_price | currency }}
            </div>
        </a>
    </div>
</template>

<script>
    import MutationTypes from '../../store/mutation-types';

    export default {
        props: [
            'drug'
        ],

        methods: {
            deleteFromFav: function(drug) {
                this.$store.commit(MutationTypes.DELETE_FAV_DRUG, drug);
            }
        }
    }
</script>

